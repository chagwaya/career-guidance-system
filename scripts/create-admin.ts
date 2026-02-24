import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    const saltRounds = 10

    // Delete existing test account to recreate a single admin-counselor login
    await prisma.admin.deleteMany({
      where: {
        OR: [
          { email: 'admin@careerpath.ke' },
          { email: 'counselor@careerpath.ke' },
        ],
      },
    })

    // Create single test account for both admin + counselor responsibilities
    const adminPassword = await bcryptjs.hash('admin123', saltRounds)
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@careerpath.ke',
        password: adminPassword,
        name: 'Admin Counselor',
        role: 'admin'
      }
    })

    console.log('✅ Admin-counselor account created:')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Password: admin123`)
    console.log('   Role: admin (includes counselor actions)')

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
