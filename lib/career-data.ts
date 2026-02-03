import type { AssessmentQuestion, CareerRecommendation } from './types'

export const kenyanUniversities = [
  'University of Nairobi',
  'Kenyatta University',
  'Moi University',
  'Jomo Kenyatta University of Agriculture and Technology',
  'Egerton University',
  'Maseno University',
  'Strathmore University',
  'United States International University - Africa',
  'KCA University',
  'Mount Kenya University',
  'Daystar University',
  'Technical University of Kenya',
  'Multimedia University of Kenya',
  'Dedan Kimathi University of Technology',
]

export const kcseSubjects = [
  'Mathematics',
  'English',
  'Kiswahili',
  'Biology',
  'Chemistry',
  'Physics',
  'History',
  'Geography',
  'CRE/IRE',
  'Business Studies',
  'Agriculture',
  'Computer Studies',
  'Home Science',
  'Art & Design',
  'Music',
  'French/German',
]

export const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E']

export const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kiambu',
  'Machakos', 'Nyeri', 'Meru', 'Kakamega', 'Bungoma', 'Kilifi',
  'Uasin Gishu', 'Trans Nzoia', 'Kajiado', 'Narok', 'Migori',
  'Homa Bay', 'Siaya', 'Kisii', 'Nyamira', 'Kericho', 'Bomet',
]

export const assessmentQuestions: AssessmentQuestion[] = [
  // Personality Questions (Holland Code - RIASEC)
  {
    id: 1,
    question: 'I enjoy working with my hands and building or fixing things.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { realistic: 5 } },
      { text: 'Agree', value: 'agree', scores: { realistic: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { realistic: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { realistic: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { realistic: 1 } },
    ],
  },
  {
    id: 2,
    question: 'I like to analyze problems and find logical solutions.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { investigative: 5 } },
      { text: 'Agree', value: 'agree', scores: { investigative: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { investigative: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { investigative: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { investigative: 1 } },
    ],
  },
  {
    id: 3,
    question: 'I express myself through creative activities like art, music, or writing.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { artistic: 5 } },
      { text: 'Agree', value: 'agree', scores: { artistic: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { artistic: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { artistic: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { artistic: 1 } },
    ],
  },
  {
    id: 4,
    question: 'I enjoy helping others and working in teams.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { social: 5 } },
      { text: 'Agree', value: 'agree', scores: { social: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { social: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { social: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { social: 1 } },
    ],
  },
  {
    id: 5,
    question: 'I like taking charge and leading projects.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { enterprising: 5 } },
      { text: 'Agree', value: 'agree', scores: { enterprising: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { enterprising: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { enterprising: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { enterprising: 1 } },
    ],
  },
  {
    id: 6,
    question: 'I prefer following established procedures and organizing data.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { conventional: 5 } },
      { text: 'Agree', value: 'agree', scores: { conventional: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { conventional: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { conventional: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { conventional: 1 } },
    ],
  },
  // Interest Questions
  {
    id: 7,
    question: 'Which activity interests you the most?',
    category: 'interest',
    options: [
      { text: 'Conducting scientific experiments', value: 'science', scores: { investigative: 3 } },
      { text: 'Creating art or music', value: 'arts', scores: { artistic: 3 } },
      { text: 'Starting a business', value: 'business', scores: { enterprising: 3 } },
      { text: 'Teaching or counseling others', value: 'helping', scores: { social: 3 } },
      { text: 'Building or repairing machines', value: 'technical', scores: { realistic: 3 } },
    ],
  },
  {
    id: 8,
    question: 'In your free time, you are most likely to:',
    category: 'interest',
    options: [
      { text: 'Read books about science or technology', value: 'read_science', scores: { investigative: 3 } },
      { text: 'Engage in sports or outdoor activities', value: 'sports', scores: { realistic: 3 } },
      { text: 'Volunteer in community service', value: 'volunteer', scores: { social: 3 } },
      { text: 'Work on creative projects', value: 'creative', scores: { artistic: 3 } },
      { text: 'Plan events or manage activities', value: 'manage', scores: { enterprising: 3 } },
    ],
  },
  {
    id: 9,
    question: 'What type of environment do you prefer working in?',
    category: 'interest',
    options: [
      { text: 'Laboratory or research facility', value: 'lab', scores: { investigative: 3 } },
      { text: 'Office with structured tasks', value: 'office', scores: { conventional: 3 } },
      { text: 'Outdoors or with machinery', value: 'outdoors', scores: { realistic: 3 } },
      { text: 'Studio or creative space', value: 'studio', scores: { artistic: 3 } },
      { text: 'Classroom or counseling center', value: 'classroom', scores: { social: 3 } },
    ],
  },
  // Strength Questions
  {
    id: 10,
    question: 'Which skill describes you best?',
    category: 'strength',
    options: [
      { text: 'Problem-solving and critical thinking', value: 'problem_solving', scores: { investigative: 3 } },
      { text: 'Communication and interpersonal skills', value: 'communication', scores: { social: 3 } },
      { text: 'Creativity and imagination', value: 'creativity', scores: { artistic: 3 } },
      { text: 'Leadership and persuasion', value: 'leadership', scores: { enterprising: 3 } },
      { text: 'Technical and mechanical skills', value: 'technical', scores: { realistic: 3 } },
    ],
  },
  {
    id: 11,
    question: 'I am good at:',
    category: 'strength',
    options: [
      { text: 'Mathematics and calculations', value: 'math', scores: { investigative: 2, conventional: 2 } },
      { text: 'Writing and expressing ideas', value: 'writing', scores: { artistic: 2, social: 2 } },
      { text: 'Organizing and planning', value: 'organizing', scores: { conventional: 3 } },
      { text: 'Convincing and negotiating', value: 'negotiating', scores: { enterprising: 3 } },
      { text: 'Understanding how things work', value: 'understanding', scores: { realistic: 2, investigative: 2 } },
    ],
  },
  {
    id: 12,
    question: 'Others often come to me for help with:',
    category: 'strength',
    options: [
      { text: 'Fixing or building things', value: 'fixing', scores: { realistic: 3 } },
      { text: 'Understanding complex concepts', value: 'concepts', scores: { investigative: 3 } },
      { text: 'Creative ideas and design', value: 'design', scores: { artistic: 3 } },
      { text: 'Personal problems and advice', value: 'advice', scores: { social: 3 } },
      { text: 'Making decisions and taking action', value: 'decisions', scores: { enterprising: 3 } },
    ],
  },
]

export const courseRecommendations: CareerRecommendation[] = [
  // STEM Courses
  {
    id: '1',
    name: 'Bachelor of Medicine and Surgery (MBChB)',
    description: 'Train to become a medical doctor, diagnosing and treating patients while contributing to healthcare in Kenya.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Egerton University'],
    requirements: ['Mean Grade: A-', 'Biology: A', 'Chemistry: A', 'Mathematics/Physics: B+'],
    careers: ['Medical Doctor', 'Surgeon', 'Medical Researcher', 'Public Health Specialist'],
    matchScore: 0,
    category: 'Health Sciences',
  },
  {
    id: '2',
    name: 'Bachelor of Science in Computer Science',
    description: 'Study programming, software development, and computing systems to build the digital solutions of tomorrow.',
    universities: ['University of Nairobi', 'JKUAT', 'Strathmore University', 'KCA University'],
    requirements: ['Mean Grade: B+', 'Mathematics: B+', 'Physics/Computer Studies: B'],
    careers: ['Software Developer', 'Data Scientist', 'Cybersecurity Analyst', 'Systems Architect'],
    matchScore: 0,
    category: 'Technology',
  },
  {
    id: '3',
    name: 'Bachelor of Engineering (Civil)',
    description: 'Design and build infrastructure like roads, bridges, and buildings that shape Kenya\'s development.',
    universities: ['University of Nairobi', 'JKUAT', 'Technical University of Kenya', 'Dedan Kimathi University'],
    requirements: ['Mean Grade: B+', 'Mathematics: A-', 'Physics: A-', 'Chemistry: B+'],
    careers: ['Civil Engineer', 'Structural Engineer', 'Construction Manager', 'Urban Planner'],
    matchScore: 0,
    category: 'Engineering',
  },
  {
    id: '4',
    name: 'Bachelor of Architecture',
    description: 'Combine creativity and technical skills to design buildings and spaces that inspire and function beautifully.',
    universities: ['University of Nairobi', 'JKUAT', 'Technical University of Kenya'],
    requirements: ['Mean Grade: B+', 'Mathematics: B+', 'Physics: B+', 'Art & Design: B+'],
    careers: ['Architect', 'Interior Designer', 'Urban Designer', 'Landscape Architect'],
    matchScore: 0,
    category: 'Engineering',
  },
  // Business & Economics
  {
    id: '5',
    name: 'Bachelor of Commerce',
    description: 'Build a strong foundation in business, accounting, and management to succeed in the corporate world.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Strathmore University', 'USIU-Africa'],
    requirements: ['Mean Grade: B', 'Mathematics: B', 'English: B'],
    careers: ['Accountant', 'Financial Analyst', 'Business Consultant', 'Entrepreneur'],
    matchScore: 0,
    category: 'Business',
  },
  {
    id: '6',
    name: 'Bachelor of Economics',
    description: 'Analyze economic trends and policies to advise governments and businesses on financial decisions.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Egerton University'],
    requirements: ['Mean Grade: B', 'Mathematics: B+', 'English: B'],
    careers: ['Economist', 'Policy Analyst', 'Financial Consultant', 'Research Analyst'],
    matchScore: 0,
    category: 'Business',
  },
  // Social Sciences & Humanities
  {
    id: '7',
    name: 'Bachelor of Laws (LLB)',
    description: 'Study legal principles and advocate for justice in courts, corporations, or public service.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Strathmore University'],
    requirements: ['Mean Grade: B+', 'English: B+', 'History/CRE: B'],
    careers: ['Advocate', 'Judge', 'Legal Consultant', 'Corporate Lawyer'],
    matchScore: 0,
    category: 'Law & Social Sciences',
  },
  {
    id: '8',
    name: 'Bachelor of Education',
    description: 'Shape the minds of future generations as a teacher or education administrator.',
    universities: ['Kenyatta University', 'Moi University', 'Maseno University', 'Egerton University'],
    requirements: ['Mean Grade: C+', 'Teaching Subjects: C+'],
    careers: ['Teacher', 'Education Administrator', 'Curriculum Developer', 'Education Consultant'],
    matchScore: 0,
    category: 'Education',
  },
  {
    id: '9',
    name: 'Bachelor of Psychology',
    description: 'Understand human behavior and mental processes to help individuals overcome challenges.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Daystar University', 'USIU-Africa'],
    requirements: ['Mean Grade: B', 'Biology: B', 'English: B'],
    careers: ['Clinical Psychologist', 'Counselor', 'Human Resource Specialist', 'Researcher'],
    matchScore: 0,
    category: 'Social Sciences',
  },
  // Arts & Creative
  {
    id: '10',
    name: 'Bachelor of Arts in Communication',
    description: 'Master the art of storytelling and media production to inform and entertain audiences.',
    universities: ['University of Nairobi', 'Daystar University', 'USIU-Africa', 'Multimedia University'],
    requirements: ['Mean Grade: B', 'English: B+', 'Kiswahili: B'],
    careers: ['Journalist', 'Public Relations Officer', 'Content Creator', 'Media Producer'],
    matchScore: 0,
    category: 'Arts & Media',
  },
  {
    id: '11',
    name: 'Bachelor of Fine Arts',
    description: 'Develop your artistic talents in visual arts, sculpture, or digital design.',
    universities: ['Kenyatta University', 'University of Nairobi', 'Technical University of Kenya'],
    requirements: ['Mean Grade: C+', 'Art & Design: B+', 'English: C+'],
    careers: ['Visual Artist', 'Graphic Designer', 'Art Director', 'Curator'],
    matchScore: 0,
    category: 'Arts & Media',
  },
  // Agriculture & Environment
  {
    id: '12',
    name: 'Bachelor of Science in Agriculture',
    description: 'Contribute to food security and sustainable farming practices in Kenya.',
    universities: ['Egerton University', 'JKUAT', 'University of Nairobi', 'Moi University'],
    requirements: ['Mean Grade: B', 'Biology: B+', 'Chemistry: B', 'Agriculture: B'],
    careers: ['Agricultural Officer', 'Farm Manager', 'Agribusiness Consultant', 'Research Scientist'],
    matchScore: 0,
    category: 'Agriculture',
  },
  {
    id: '13',
    name: 'Bachelor of Environmental Science',
    description: 'Protect and conserve Kenya\'s natural resources through sustainable environmental practices.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Maseno University'],
    requirements: ['Mean Grade: B', 'Biology: B+', 'Chemistry: B', 'Geography: B'],
    careers: ['Environmental Scientist', 'Conservation Officer', 'Environmental Consultant', 'Policy Analyst'],
    matchScore: 0,
    category: 'Environment',
  },
  // Health Sciences
  {
    id: '14',
    name: 'Bachelor of Science in Nursing',
    description: 'Provide compassionate healthcare and support to patients in hospitals and communities.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Mount Kenya University'],
    requirements: ['Mean Grade: B', 'Biology: B+', 'Chemistry: B', 'English: B'],
    careers: ['Registered Nurse', 'Nurse Educator', 'Public Health Nurse', 'Nurse Administrator'],
    matchScore: 0,
    category: 'Health Sciences',
  },
  {
    id: '15',
    name: 'Bachelor of Pharmacy',
    description: 'Become an expert in medications and their use to improve patient health outcomes.',
    universities: ['University of Nairobi', 'Kenyatta University', 'JKUAT', 'Mount Kenya University'],
    requirements: ['Mean Grade: A-', 'Biology: A-', 'Chemistry: A-', 'Mathematics/Physics: B+'],
    careers: ['Pharmacist', 'Pharmaceutical Researcher', 'Clinical Pharmacist', 'Regulatory Affairs'],
    matchScore: 0,
    category: 'Health Sciences',
  },
]

export function calculateRecommendations(scores: {
  realistic: number
  investigative: number
  artistic: number
  social: number
  enterprising: number
  conventional: number
}): CareerRecommendation[] {
  const courseMatches = courseRecommendations.map(course => {
    let matchScore = 0
    
    // Health Sciences - high investigative and social
    if (course.category === 'Health Sciences') {
      matchScore = (scores.investigative * 0.4) + (scores.social * 0.4) + (scores.realistic * 0.2)
    }
    // Technology - high investigative and conventional
    else if (course.category === 'Technology') {
      matchScore = (scores.investigative * 0.5) + (scores.conventional * 0.3) + (scores.realistic * 0.2)
    }
    // Engineering - high realistic and investigative
    else if (course.category === 'Engineering') {
      matchScore = (scores.realistic * 0.4) + (scores.investigative * 0.4) + (scores.artistic * 0.2)
    }
    // Business - high enterprising and conventional
    else if (course.category === 'Business') {
      matchScore = (scores.enterprising * 0.5) + (scores.conventional * 0.3) + (scores.social * 0.2)
    }
    // Law & Social Sciences - high social and enterprising
    else if (course.category === 'Law & Social Sciences' || course.category === 'Social Sciences') {
      matchScore = (scores.social * 0.4) + (scores.enterprising * 0.3) + (scores.investigative * 0.3)
    }
    // Education - high social and conventional
    else if (course.category === 'Education') {
      matchScore = (scores.social * 0.5) + (scores.conventional * 0.3) + (scores.artistic * 0.2)
    }
    // Arts & Media - high artistic
    else if (course.category === 'Arts & Media') {
      matchScore = (scores.artistic * 0.5) + (scores.social * 0.3) + (scores.enterprising * 0.2)
    }
    // Agriculture & Environment
    else if (course.category === 'Agriculture' || course.category === 'Environment') {
      matchScore = (scores.realistic * 0.4) + (scores.investigative * 0.4) + (scores.social * 0.2)
    }
    
    return {
      ...course,
      matchScore: Math.round(matchScore),
    }
  })
  
  return courseMatches.sort((a, b) => b.matchScore - a.matchScore)
}

export function getPersonalityType(scores: {
  realistic: number
  investigative: number
  artistic: number
  social: number
  enterprising: number
  conventional: number
}): string {
  const types = [
    { type: 'Realistic', score: scores.realistic },
    { type: 'Investigative', score: scores.investigative },
    { type: 'Artistic', score: scores.artistic },
    { type: 'Social', score: scores.social },
    { type: 'Enterprising', score: scores.enterprising },
    { type: 'Conventional', score: scores.conventional },
  ]
  
  types.sort((a, b) => b.score - a.score)
  return types[0].type
}

export const personalityDescriptions: Record<string, string> = {
  Realistic: 'You prefer hands-on work and practical problem-solving. You enjoy working with tools, machines, or nature and value concrete results.',
  Investigative: 'You are curious and analytical. You enjoy researching, studying, and solving complex problems through logical thinking.',
  Artistic: 'You are creative and expressive. You value imagination, originality, and independence in your work and enjoy artistic activities.',
  Social: 'You are caring and helpful. You enjoy working with people, teaching, counseling, and making a positive impact on others\' lives.',
  Enterprising: 'You are ambitious and persuasive. You enjoy leading, influencing others, and taking on challenges in competitive environments.',
  Conventional: 'You are organized and detail-oriented. You prefer structured tasks, clear expectations, and systematic approaches to work.',
}
