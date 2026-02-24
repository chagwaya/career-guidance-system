# CareerPath Kenya - Complete Testing Guide

## System Overview
The system now has:
- **Secure Student Authentication** with password hashing (bcrypt)
- **Unified Admin/Counselor Dashboard** for managing all students
- **Secure Admin/Counselor Login** with hashed passwords
- **Two-way messaging system** between students and counselors
- **Student Profile Management** with secure password protection

---

## Test Credentials

### Admin Counselor Account
- **Email**: admin@careerpath.ke
- **Password**: admin123
- **Role**: admin (includes counselor functions)

---

## Test Flow

### Phase 1: Student Registration & Login

#### 1.1 Student Sign Up
1. Navigate to http://localhost:3000
2. Click "Student Login" button in navigation
3. Click "Don't have an account? Sign up" link
4. Fill in registration form:
   - Full Name: Test Student
   - School: Nairobi High School
   - Grade: Form 4
   - County: Nairobi
   - Email: student@test.com
   - Password: student123
5. Click "Create Account"
6. **Expected Result**: Student redirected to profile page and logged in

#### 1.2 Student Login
1. Go to http://localhost:3000/student-login
2. Click "Already have an account? Login"
3. Enter credentials:
   - Email: student@test.com
   - Password: student123
4. Click "Login"
5. **Expected Result**: Redirected to profile page with student data

#### 1.3 Test Wrong Password
1. Go to http://localhost:3000/student-login
2. Enter email: student@test.com
3. Enter password: wrongpassword
4. Click "Login"
5. **Expected Result**: Error message "Invalid credentials"

---

### Phase 2: Student Journey

#### 2.1 Complete Profile
1. From profile page, fill in subject grades:
   - Add at least 3 subjects with grades
2. Save profile
3. **Expected Result**: Subjects saved to database

#### 2.2 Take Assessment
1. Click "Assessment" in navigation
2. Select multiple answers for each question (new feature!)
3. Add custom answers if needed (new feature!)
4. Complete all 30 questions
5. Submit assessment
6. View recommendations
7. **Expected Result**: Assessment saved with multiple answers support

#### 2.3 Send Message to Counselor
1. Click "Counselor" in navigation
2. Type a message asking about a course/university
3. Send message
4. **Expected Result**: Message appears in chat (from student side)

---

### Phase 3: Admin/Counselor Dashboard (UNIFIED)

#### 3.1 Admin Login & View Dashboard
1. Click "Admin" button in navigation
2. Enter admin credentials:
   - Email: admin@careerpath.ke
   - Password: admin123
3. Click "Login"
4. **Expected Result**: 
   - Redirected to admin dashboard
   - Statistics cards show totals
   - Student list displays all registered students

#### 3.2 View Student Profile
1. On admin dashboard, find "Test Student" in the table
2. Click "View" button on the row
3. Click "Overview" tab
4. **Expected Result**: Modal shows complete student details:
   - Personal Information (name, email, school, county, grade, join date)
   - Subject Grades
   - Assessment Results with personality type, interests, strengths

#### 3.3 Reply to Student Message
1. On admin dashboard, find "Test Student"
2. Click "View" button
3. Click "Messages" tab
4. **Expected Result**: 
   - Student's message appears in blue on the left
   - Message timestamp shows
5. Type reply in text field
6. Click "Send" button
7. **Expected Result**: 
   - Reply appears in green on the right
   - Message count updates

#### 3.4 Confirm Single Login Model
1. Click "Home" button to exit admin
2. Click "Admin" button again
3. Logout first (click Logout button)
4. Enter the same admin counselor credentials:
   - Email: admin@careerpath.ke
   - Password: admin123
5. Click "Login"
6. **Expected Result**: 
   - Logged in with single admin counselor account
   - Can see same dashboard and reply to messages

---

### Phase 4: Student Receives Reply (Two-Way Sync)

#### 4.1 Student Checks for Counselor Reply
1. Open new browser/incognito window (or logout as admin first)
2. Go to http://localhost:3000/student-login
3. Login as student (student@test.com / student123)
4. Click "Counselor" in navigation
5. **Expected Result**: 
   - Student's original message shows
   - Counselor's reply appears below
   - Both messages are visible with correct sender indication

---

### Phase 5: Security Testing

#### 5.1 Password Hashing Verification
1. Open your database tool (PhpMyAdmin/MySQL)
2. Check `career_guidance` database
3. Look at `Student` and `Admin` tables
4. View password column
5. **Expected Result**: 
   - Passwords are hashed (long strings, not plaintext)
   - Example: `$2a$10$...` format (bcrypt)
   - Not plaintext like "student123" or "admin123"

#### 5.2 Test Session Management
1. Login as student
2. Clear browser cookies/storage
3. Try to access profile page directly
4. **Expected Result**: Redirected to login page (session lost)

#### 5.3 Test Invalid Email on Signup
1. Go to student login page
2. Try to sign up with existing email (student@test.com)
3. **Expected Result**: Error message "Email already registered"

#### 5.4 Test Admin Session Protection
1. Try to access http://localhost:3000/admin directly without logging in
2. **Expected Result**: Redirected to admin login page

---

### Phase 6: Data Integrity Testing

#### 6.1 Verify Message Persistence
1. Admin sends reply to student
2. Admin logs out and back in
3. Navigate to same student's messages
4. **Expected Result**: Previous messages still visible

#### 6.2 Verify Student Data Persistence
1. Student completes assessment
2. Student logs out
3. Student logs back in
4. Navigate to recommendations
5. **Expected Result**: Previous assessment results still visible

#### 6.3 Verify Assessment Scoring
1. View student assessment in admin dashboard
2. Check calculated personality type
3. Verify it matches one of the Holland RIASEC types
4. **Expected Result**: Personality type correctly assigned

---

## API Endpoints Tested

### Student Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/student-login` - Login student with password verification

### Admin Authentication
- `POST /api/auth/login` - Login admin/counselor with password verification

### Student Management
- `GET /api/students?id=...` - Fetch student (excludes password)
- `POST /api/students` - Create student (hashes password)
- `PUT /api/students` - Update student (hashes password if provided)

### Messaging (Two-Way Sync)
- `GET /api/messages?studentId=...` - Fetch all messages for a student
- `POST /api/messages` - Send message (both student and counselor)

### Admin Views
- `GET /api/admin/students` - Fetch all students with details
- `GET /api/admin/stats` - Fetch dashboard statistics

---

## Common Issues & Solutions

### Issue: "Student not found" error on profile
**Solution**: 
- Make sure you completed the student login/signup correctly
- Check browser localStorage for `student_session`
- Clear localStorage and login again

### Issue: Password seems to be plaintext in database
**Solution**: 
- This is expected for existing test data
- All NEW passwords created after bcrypt implementation are hashed
- Recreate admin accounts with: `pnpm tsx scripts/create-admin.ts`

### Issue: Can't see counselor's reply on student side
**Solution**:
- Make sure the counselor sent the reply (check admin side first)
- Refresh the page to reload messages
- Check that student is logged in with correct account

### Issue: Admin dashboard shows no students
**Solution**:
- Create at least one student account first
- Verify student completed signup process
- Check database connection is working

---

## Database Schema Changes

The following changes were made to support security:

1. **Student table**: Added `password` column (hashed with bcrypt)
2. **Admin table**: Password now hashed (regenerated with script)
3. **CounselorMessage table**: Supports bidirectional messages (fromStudent boolean)

---

## Next Steps (Optional Enhancements)

1. **Email Verification**: Send confirmation emails on signup
2. **Password Reset**: Add forgot password functionality
3. **Activity Logging**: Track admin actions for audit
4. **Rate Limiting**: Prevent brute force login attempts
5. **Session Timeout**: Auto-logout after inactivity
6. **File Uploads**: Allow students to upload documents
7. **Analytics Dashboard**: Advanced reporting for admins

---

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Check terminal output where `pnpm dev` is running
3. Verify database connection in .env file
4. Clear browser cache and localStorage
5. Restart development server with `pnpm dev`

