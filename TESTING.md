# 🧪 Career Guidance System - Testing Guide

## 🚀 Quick Start

**Development Server**: http://localhost:3000

---

## 📝 Test Credentials

### Admin Counselor Account
- **Email**: admin@careerpath.ke
- **Password**: admin123
- **Role**: Admin + Counselor

---

## 🔄 Complete Test Flow

### **1️⃣ Student Profile Creation** (5 mins)
**URL**: http://localhost:3000/profile

Steps:
- Click "Create Profile"
- Fill in:
  - Name: `Test Student`
  - Email: `student@example.com`
  - School: `Sample High School`
  - Class: `Form 4`
  - County: `Nairobi`
  - Add 3-5 subjects with grades (e.g., Mathematics A, English B+)
- Click "Save & Continue Assessment"
- ✅ Profile should be saved to database

---

### **2️⃣ Career Assessment** (10 mins)
**URL**: http://localhost:3000/assessment

Features to Test:
- **Multiple Selection**: Each question allows selecting multiple answers (checkboxes)
- **Custom Answers**: If your choice isn't in the list:
  - Type in the "Or add your own answer" field
  - Click "Add" or press Enter
  - Custom answer appears as a badge (click × to remove)
- **Navigation**: Use question number pills to jump between questions
- **Progress Bar**: Shows completion percentage

Scoring:
- System calculates RIASEC scores (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)
- Determines personality type
- Identifies interests and strengths from answers

---

### **3️⃣ View Recommendations** (3 mins)
**URL**: http://localhost:3000/recommendations

- See personalized course recommendations
- Rankings based on assessment scores
- Filter by category
- Sort by match score or name

---

### **4️⃣ Student Messaging** (2 mins)
**URL**: http://localhost:3000/counselor

Features:
- Send messages to counselor
- Messages appear instantly
- Suggested questions available
- Messages stored in database for counselor response

---

### **5️⃣ Admin Dashboard** (5 mins)
**URL**: http://localhost:3000/admin/login

Steps:
1. Login with admin credentials:
   - Email: `admin@careerpath.ke`
   - Password: `admin123`
2. View Dashboard:
   - Total Students
   - Completed Assessments
   - Student Messages
   - Schools Reached
3. Browse Students Table:
   - Search by name or school
   - Filter by status (All/Completed/Pending)
   - See personality types and message counts

---

### **6️⃣ Counselor Dashboard** (5 mins)
**URL**: http://localhost:3000/admin/login (then click Messages)

Steps:
1. Login with admin counselor credentials:
   - Email: `admin@careerpath.ke`
   - Password: `admin123`
2. View Student Messages:
   - Left panel: List of students with pending/resolved messages
   - Click any student to view their messages
   - Badge shows "New" if unresponded
3. Send Response:
   - Type response in text area
   - Click "Send Response"
   - Response saved to database
4. Search:
   - Filter students by name, email, or school

---

## 🎯 Test Checklist

- [ ] Student can create profile
- [ ] Profile data saved to database
- [ ] Assessment accepts multiple answers
- [ ] Custom answers can be added to assessment
- [ ] Assessment calculates scores correctly
- [ ] Recommendations display based on scores
- [ ] Student can send messages
- [ ] Admin can login and see dashboard
- [ ] Admin can see all students with assessments
- [ ] Admin counselor can login and see messages
- [ ] Counselor can send responses to students
- [ ] All data persists in database

---

## 🔧 Troubleshooting

### Profile won't save
- Check email is unique
- All required fields filled
- At least 3 subjects with grades

### Assessment page blank
- Make sure profile is created first
- Check browser console for errors
- Refresh page

### Admin login not working
- Verify credentials are correct
- Check .env has DATABASE_URL
- Make sure MySQL is running in XAMPP

### No messages appear
- Student must send message first
- Check student ID matches in database
- Messages are student-to-counselor only

---

## 📊 Database Tables

**Students** - Student profiles with subjects
**AssessmentResults** - Quiz scores and personality types
**CounselorMessages** - Chat between students and counselors
**Admins** - Counselor/admin login credentials

View data in **XAMPP phpMyAdmin**: http://localhost/phpmyadmin
- Database: `career_guidance`

---

## 🚀 Next Steps

After testing, consider:
1. Hash passwords in Admin table (use bcrypt)
2. Add email notifications
3. Implement file uploads (transcripts, documents)
4. Add analytics and reports
5. Deploy to production
