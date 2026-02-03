"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, KeyRound } from "lucide-react"

// In production, this would be managed through a secure admin system
const ADMIN_REGISTRATION_CODE = "CAREERPATH2024"

export default function AdminRegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registrationCode, setRegistrationCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, isAuthenticated, user } = useAuth()
  const router = useRouter()

  // Redirect if already logged in as admin
  if (isAuthenticated && user?.role === "admin") {
    router.push("/admin")
    return null
  }

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  }

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Verify registration code
    if (registrationCode !== ADMIN_REGISTRATION_CODE) {
      setError("Invalid registration code. Please contact the system administrator.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    const result = await register(name, email, password, "admin")
    
    if (result.success) {
      router.push("/admin")
    } else {
      setError(result.error || "Registration failed. Please try again.")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Registration</h1>
            <p className="text-muted-foreground mt-2">
              Create an administrator account for CareerPath Kenya
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Administrator Access
              </CardTitle>
              <CardDescription>
                This registration requires a valid admin registration code
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="registrationCode">Registration Code</Label>
                  <Input
                    id="registrationCode"
                    type="password"
                    placeholder="Enter admin registration code"
                    value={registrationCode}
                    onChange={(e) => setRegistrationCode(e.target.value)}
                    required
                    disabled={isLoading}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact your system administrator if you do not have a registration code
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Official Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your official email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {password && (
                    <div className="space-y-2 mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              passwordStrength >= level
                                ? passwordStrength <= 2
                                  ? "bg-destructive"
                                  : passwordStrength === 3
                                  ? "bg-secondary"
                                  : "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center gap-1 ${passwordChecks.length ? "text-primary" : "text-muted-foreground"}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          8+ characters
                        </div>
                        <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? "text-primary" : "text-muted-foreground"}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          Uppercase letter
                        </div>
                        <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? "text-primary" : "text-muted-foreground"}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          Lowercase letter
                        </div>
                        <div className={`flex items-center gap-1 ${passwordChecks.number ? "text-primary" : "text-muted-foreground"}`}>
                          <CheckCircle2 className="h-3 w-3" />
                          Number
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Administrator accounts have elevated privileges. All admin activities are logged for security purposes.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || passwordStrength < 4}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating admin account...
                    </>
                  ) : (
                    "Create Admin Account"
                  )}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Already have an admin account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
