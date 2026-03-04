export interface Student {
  id: string
  name: string
  email: string
  school: string
  grade: string
  county: string
  subjects: SubjectGrade[]
  isKCSEGraduate: boolean
  createdAt: string
}

export interface SubjectGrade {
  subject: string
  grade: string
}

export interface AssessmentResult {
  id: string
  studentId: string
  personalityType: PersonalityType
  interests: string[]
  strengths: string[]
  completedAt: string
  scores: {
    realistic: number
    investigative: number
    artistic: number
    social: number
    enterprising: number
    conventional: number
  }
}

export type PersonalityType = 
  | 'Realistic'
  | 'Investigative'
  | 'Artistic'
  | 'Social'
  | 'Enterprising'
  | 'Conventional'

export interface CareerRecommendation {
  id: string
  name: string
  description: string
  universities: string[]
  requirements: string[]
  careers: string[]
  matchScore: number
  category: string
}

export interface CounselorMessage {
  id: string
  studentId: string
  message: string
  fromStudent: boolean
  timestamp: string
}

export interface AssessmentQuestion {
  id: number
  question: string
  category: 'personality' | 'interest' | 'strength'
  multipleAnswers?: boolean
  options: {
    text: string
    value: string
    scores?: Partial<AssessmentResult['scores']>
  }[]
}
