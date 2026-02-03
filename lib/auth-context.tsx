"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export type UserRole = "student" | "admin" | "counselor"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  lastLogin: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  sessionExpiry: number | null
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session duration: 30 minutes
const SESSION_DURATION = 30 * 60 * 1000

// Simple hash function for demo (in production, use bcrypt on server)
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

// Generate secure session token
function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" }
  }
  return { valid: true }
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    sessionExpiry: null,
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = sessionStorage.getItem("careerpath_session")
        if (sessionData) {
          const session = JSON.parse(sessionData)
          const now = Date.now()
          
          if (session.expiry && session.expiry > now && session.user) {
            setAuthState({
              user: session.user,
              isAuthenticated: true,
              isLoading: false,
              sessionExpiry: session.expiry,
            })
            return
          } else {
            // Session expired, clear it
            sessionStorage.removeItem("careerpath_session")
          }
        }
      } catch {
        sessionStorage.removeItem("careerpath_session")
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }

    checkSession()
  }, [])

  // Session expiry checker
  useEffect(() => {
    if (!authState.sessionExpiry) return

    const checkExpiry = () => {
      if (authState.sessionExpiry && Date.now() > authState.sessionExpiry) {
        logout()
      }
    }

    const interval = setInterval(checkExpiry, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [authState.sessionExpiry])

  const refreshSession = useCallback(() => {
    if (authState.user) {
      const newExpiry = Date.now() + SESSION_DURATION
      const sessionData = {
        user: authState.user,
        token: generateSessionToken(),
        expiry: newExpiry,
      }
      sessionStorage.setItem("careerpath_session", JSON.stringify(sessionData))
      setAuthState(prev => ({ ...prev, sessionExpiry: newExpiry }))
    }
  }, [authState.user])

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    // Sanitize inputs
    const cleanEmail = sanitizeInput(email.toLowerCase())
    
    // Validate email
    if (!isValidEmail(cleanEmail)) {
      return { success: false, error: "Please enter a valid email address" }
    }

    // Get stored users
    const storageKey = role === "admin" ? "careerpath_admins" : "careerpath_users"
    const storedUsers = localStorage.getItem(storageKey)
    
    if (!storedUsers) {
      return { success: false, error: "Invalid email or password" }
    }

    try {
      const users = JSON.parse(storedUsers)
      const user = users.find((u: { email: string }) => u.email === cleanEmail)
      
      if (!user) {
        // Use generic error to prevent email enumeration
        return { success: false, error: "Invalid email or password" }
      }

      // Verify password hash
      const passwordHash = simpleHash(password + user.salt)
      if (passwordHash !== user.passwordHash) {
        return { success: false, error: "Invalid email or password" }
      }

      // Create session
      const sessionUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: new Date().toISOString(),
      }

      const expiry = Date.now() + SESSION_DURATION
      const sessionData = {
        user: sessionUser,
        token: generateSessionToken(),
        expiry,
      }

      sessionStorage.setItem("careerpath_session", JSON.stringify(sessionData))
      
      // Update last login in storage
      const updatedUsers = users.map((u: { id: string }) => 
        u.id === user.id ? { ...u, lastLogin: sessionUser.lastLogin } : u
      )
      localStorage.setItem(storageKey, JSON.stringify(updatedUsers))

      setAuthState({
        user: sessionUser,
        isAuthenticated: true,
        isLoading: false,
        sessionExpiry: expiry,
      })

      return { success: true }
    } catch {
      return { success: false, error: "An error occurred. Please try again." }
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    // Sanitize inputs
    const cleanName = sanitizeInput(name)
    const cleanEmail = sanitizeInput(email.toLowerCase())

    // Validate inputs
    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: "Please enter a valid name (at least 2 characters)" }
    }

    if (!isValidEmail(cleanEmail)) {
      return { success: false, error: "Please enter a valid email address" }
    }

    const passwordValidation = isValidPassword(password)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.message }
    }

    // Check for existing user
    const storageKey = role === "admin" ? "careerpath_admins" : "careerpath_users"
    const storedUsers = localStorage.getItem(storageKey)
    const users = storedUsers ? JSON.parse(storedUsers) : []

    if (users.some((u: { email: string }) => u.email === cleanEmail)) {
      return { success: false, error: "An account with this email already exists" }
    }

    // Create new user with salted password hash
    const salt = generateSessionToken().slice(0, 16)
    const passwordHash = simpleHash(password + salt)
    
    const newUser = {
      id: generateSessionToken().slice(0, 16),
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      salt,
      role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    // Store user
    users.push(newUser)
    localStorage.setItem(storageKey, JSON.stringify(users))

    // Create session
    const sessionUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: newUser.createdAt,
      lastLogin: newUser.lastLogin,
    }

    const expiry = Date.now() + SESSION_DURATION
    const sessionData = {
      user: sessionUser,
      token: generateSessionToken(),
      expiry,
    }

    sessionStorage.setItem("careerpath_session", JSON.stringify(sessionData))

    setAuthState({
      user: sessionUser,
      isAuthenticated: true,
      isLoading: false,
      sessionExpiry: expiry,
    })

    return { success: true }
  }

  const logout = useCallback(() => {
    sessionStorage.removeItem("careerpath_session")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      sessionExpiry: null,
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
