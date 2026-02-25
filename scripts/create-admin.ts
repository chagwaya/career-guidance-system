import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    const saltRounds = 10

    // Upsert single admin-counselor account so this script is safe to rerun.
    const adminPassword = await bcryptjs.hash('admin123', saltRounds)
    const admin = await prisma.admin.upsert({
      where: {
        email: 'admin@careerpath.ke',
      },
      update: {
        password: adminPassword,
        name: 'Admin Counselor',
        role: 'admin',
      },
      create: {
        email: 'admin@careerpath.ke',
        password: adminPassword,
        name: 'Admin Counselor',
        role: 'admin',
      },
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
