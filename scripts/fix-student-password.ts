import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Get all students
    const students = await prisma.student.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      }
    })

    console.log(`\nFound ${students.length} students in database:\n`)
    students.forEach((student, index) => {
      console.log(`${index + 1}. ${student.name} (${student.email})`)
    })

    // Ask for email to fix
    console.log('\n')
    const email = process.argv[2]
    const newPassword = process.argv[3] || 'password123'

    if (!email) {
      console.log('Usage: npx tsx scripts/fix-student-password.ts <email> [new-password]')
      console.log('Example: npx tsx scripts/fix-student-password.ts student@example.com myNewPass123')
      process.exit(1)
    }

    const student = await prisma.student.findUnique({
      where: { email }
    })

    if (!student) {
      console.log(`❌ Student with email ${email} not found`)
      process.exit(1)
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10)

    // Update student password
    await prisma.student.update({
      where: { email },
      data: { password: hashedPassword }
    })

    console.log(`\n✅ Password updated successfully for ${student.name} (${email})`)
    console.log(`   New password: ${newPassword}`)

    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
