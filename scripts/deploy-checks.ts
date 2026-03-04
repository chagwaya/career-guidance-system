import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

// Load .env if present (Render sets env vars directly, local dev uses .env)
const envPath = resolve(process.cwd(), '.env')
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex).trim()
    let value = trimmed.slice(eqIndex + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

/**
 * Pre-start deployment check:
 *  1. Verify database connection
 *  2. Push schema (create / migrate tables)
 *  3. Ensure the admin seed row exists
 *
 * Exit 0 on success, exit 1 on failure.
 */

const prisma = new PrismaClient()

async function checkDatabaseConnection(): Promise<boolean> {
  console.log('🔍 Checking database connection…')
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', (error as Error).message)
    return false
  }
}

async function checkTablesExist(): Promise<boolean> {
  console.log('🔍 Checking if tables exist…')
  try {
    // Try querying each model — if the table doesn't exist Prisma throws
    await prisma.admin.count()
    await prisma.student.count()
    await prisma.assessmentResult.count()
    await prisma.counselorMessage.count()
    await prisma.subjectGrade.count()
    console.log('✅ All tables exist')
    return true
  } catch {
    console.log('⚠️  One or more tables are missing')
    return false
  }
}

async function pushSchema(): Promise<void> {
  console.log('🔧 Pushing Prisma schema to database…')
  const { execSync } = await import('child_process')
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' })
  console.log('✅ Schema push complete')
}

async function seedAdmin(): Promise<void> {
  console.log('🔍 Checking admin account…')
  const existing = await prisma.admin.findUnique({
    where: { email: 'admin@careerpath.ke' },
  })

  if (existing) {
    console.log('✅ Admin account already exists')
    return
  }

  console.log('🔧 Creating admin account…')
  const hashedPassword = await bcryptjs.hash('admin123', 10)
  await prisma.admin.create({
    data: {
      email: 'admin@careerpath.ke',
      password: hashedPassword,
      name: 'Admin Counselor',
      role: 'admin',
    },
  })
  console.log('✅ Admin account created (admin@careerpath.ke / admin123)')
}

async function main() {
  console.log('\n=== Deployment Pre-flight Checks ===\n')

  // 1. Database connection
  const connected = await checkDatabaseConnection()
  if (!connected) {
    console.error('\n💥 Cannot reach the database. Aborting.')
    process.exit(1)
  }

  // 2. Tables
  const tablesOk = await checkTablesExist()
  if (!tablesOk) {
    await pushSchema()
    // Verify again after push
    const tablesNow = await checkTablesExist()
    if (!tablesNow) {
      console.error('\n💥 Tables still missing after schema push. Aborting.')
      process.exit(1)
    }
  }

  // 3. Seed data
  await seedAdmin()

  console.log('\n=== All checks passed ✅ ===\n')
  await prisma.$disconnect()
  process.exit(0)
}

main().catch(async (err) => {
  console.error('\n💥 Pre-flight check failed:', err)
  await prisma.$disconnect()
  process.exit(1)
})
