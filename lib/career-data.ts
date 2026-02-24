import type { AssessmentQuestion, CareerRecommendation } from './types'

export const kenyanUniversities = [
  'University of Nairobi',
  'Kenyatta University',
  'Moi University',
  'Jomo Kenyatta University of Agriculture and Technology',
  'Egerton University',
  'Maseno University',
  'Masinde Muliro University of Science and Technology',
  'Technical University of Kenya',
  'Dedan Kimathi University of Technology',
  'Multimedia University of Kenya',
  'Pwani University',
  'Kisii University',
  'Chuka University',
  'South Eastern Kenya University',
  'Meru University of Science and Technology',
  'Karatina University',
  'Machakos University',
  'Laikipia University',
  'Kibabii University',
  'Taita Taveta University',
  'The Co-operative University of Kenya',
  'Strathmore University',
  'United States International University - Africa',
  'KCA University',
  'Mount Kenya University',
  'Daystar University',
  'Zetech University',
  'Catholic University of Eastern Africa',
  'Kenya Methodist University',
  'Riara University',
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
  {
    id: 1,
    question: 'I enjoy working with equipment, tools, or practical systems.',
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
    question: 'I like investigating ideas, data, and complex questions deeply.',
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
    question: 'I naturally express myself through design, writing, media, or creativity.',
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
    question: 'I feel motivated when serving, mentoring, or supporting other people.',
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
    question: 'I enjoy leading initiatives, persuading others, and building opportunities.',
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
    question: 'I prefer structured workflows, planning, and accurate records.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { conventional: 5 } },
      { text: 'Agree', value: 'agree', scores: { conventional: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { conventional: 3 } },
      { text: 'Disagree', value: 'disagree', scores: { conventional: 2 } },
      { text: 'Strongly Disagree', value: 'strongly_disagree', scores: { conventional: 1 } },
    ],
  },
  {
    id: 7,
    question: 'Which subjects or learning areas do you enjoy most? (Select all that apply)',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'Math, statistics, or accounting', value: 'math_stats', scores: { investigative: 3, conventional: 2 } },
      { text: 'Biology, chemistry, or health sciences', value: 'bio_health', scores: { investigative: 3, social: 2 } },
      { text: 'Physics, engineering, or technical studies', value: 'physics_tech', scores: { realistic: 3, investigative: 2 } },
      { text: 'Business, economics, or entrepreneurship', value: 'business_econ', scores: { enterprising: 3, conventional: 2 } },
      { text: 'Literature, languages, or communication', value: 'language_comm', scores: { artistic: 3, social: 2 } },
      { text: 'History, law, governance, or civic studies', value: 'law_governance', scores: { social: 2, enterprising: 2, investigative: 1 } },
      { text: 'Agriculture, environment, or geography', value: 'agri_env', scores: { realistic: 3, investigative: 2 } },
      { text: 'Art, design, music, film, or drama', value: 'creative_arts', scores: { artistic: 4 } },
    ],
  },
  {
    id: 8,
    question: 'Which real-world problems would you most like to solve? (Select all that apply)',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'Improving hospitals, health, and mental wellbeing', value: 'problem_health', scores: { social: 3, investigative: 2 } },
      { text: 'Building better infrastructure, transport, and housing', value: 'problem_infra', scores: { realistic: 3, investigative: 2 } },
      { text: 'Creating jobs, businesses, and financial growth', value: 'problem_business', scores: { enterprising: 3, conventional: 2 } },
      { text: 'Protecting the environment and climate resilience', value: 'problem_environment', scores: { investigative: 2, realistic: 2, social: 1 } },
      { text: 'Improving justice, rights, and public policy', value: 'problem_justice', scores: { social: 2, enterprising: 2, investigative: 1 } },
      { text: 'Improving education and youth development', value: 'problem_education', scores: { social: 3, conventional: 1 } },
      { text: 'Creating content, culture, and digital experiences', value: 'problem_media', scores: { artistic: 3, enterprising: 1 } },
    ],
  },
  {
    id: 9,
    question: 'What type of tasks energize you most? (Select all that apply)',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'Researching, experimenting, and data analysis', value: 'task_research', scores: { investigative: 4 } },
      { text: 'Designing, prototyping, and hands-on production', value: 'task_build', scores: { realistic: 3, artistic: 1 } },
      { text: 'Presenting, persuading, and pitching ideas', value: 'task_pitch', scores: { enterprising: 3, social: 1 } },
      { text: 'Teaching, coaching, or counseling people', value: 'task_teach', scores: { social: 4 } },
      { text: 'Planning systems, budgets, and operations', value: 'task_operations', scores: { conventional: 4 } },
      { text: 'Creating stories, visuals, performances, or campaigns', value: 'task_story', scores: { artistic: 4 } },
      { text: 'Fieldwork, travel, and outdoor assignments', value: 'task_fieldwork', scores: { realistic: 3, social: 1 } },
    ],
  },
  {
    id: 10,
    question: 'Which environments do you see yourself thriving in? (Select all that apply)',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'Laboratories, hospitals, or clinical settings', value: 'env_clinic', scores: { investigative: 2, social: 2 } },
      { text: 'Tech companies, startups, or innovation labs', value: 'env_tech', scores: { investigative: 3, enterprising: 1 } },
      { text: 'Courts, offices, policy institutions, or NGOs', value: 'env_policy', scores: { social: 2, conventional: 1, enterprising: 1 } },
      { text: 'Construction sites, factories, or engineering plants', value: 'env_industry', scores: { realistic: 4 } },
      { text: 'Studios, media houses, production teams, or agencies', value: 'env_media', scores: { artistic: 3, enterprising: 1 } },
      { text: 'Schools, communities, social programs, or training centres', value: 'env_community', scores: { social: 4 } },
      { text: 'Hotels, airlines, tourism, events, or service operations', value: 'env_service', scores: { social: 2, enterprising: 2 } },
      { text: 'Farms, conservation sites, marine, or wildlife settings', value: 'env_nature', scores: { realistic: 3, investigative: 1 } },
    ],
  },
  {
    id: 11,
    question: 'Which co-curricular activities feel most natural to you? (Select all that apply)',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'STEM club, robotics, coding, or hackathons', value: 'club_stem', scores: { investigative: 3, realistic: 1 } },
      { text: 'Debate, MUN, leadership council, or journalism', value: 'club_debate', scores: { enterprising: 2, social: 2, artistic: 1 } },
      { text: 'Drama, music, dance, photography, or content creation', value: 'club_creative', scores: { artistic: 4 } },
      { text: 'Scouts, Red Cross, peer counseling, or volunteering', value: 'club_service', scores: { social: 4 } },
      { text: 'Business club, market day, or enterprise projects', value: 'club_business', scores: { enterprising: 3, conventional: 1 } },
      { text: 'Sports teams, fitness training, or coaching', value: 'club_sports', scores: { realistic: 2, social: 2 } },
      { text: 'Organizing events and keeping records/logistics', value: 'club_admin', scores: { conventional: 4 } },
    ],
  },
  {
    id: 12,
    question: 'What kind of digital content do you consume most? (Select all that apply)',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'Science explainers, medical channels, or documentaries', value: 'content_science', scores: { investigative: 3 } },
      { text: 'Business strategy, finance, and entrepreneurship content', value: 'content_business', scores: { enterprising: 3, conventional: 1 } },
      { text: 'Design, fashion, film, or creative tutorials', value: 'content_creative', scores: { artistic: 3 } },
      { text: 'Legal affairs, policy analysis, and current affairs', value: 'content_law', scores: { social: 2, investigative: 2 } },
      { text: 'Engineering builds, gadgets, or DIY projects', value: 'content_engineering', scores: { realistic: 3, investigative: 1 } },
      { text: 'Education, motivation, and self-development channels', value: 'content_education', scores: { social: 2, enterprising: 1 } },
      { text: 'Travel, hospitality, food, and culture experiences', value: 'content_hospitality', scores: { social: 2, artistic: 1, enterprising: 1 } },
    ],
  },
  {
    id: 13,
    question: 'People trust you most for which strengths? (Select all that apply)',
    category: 'strength',
    multipleAnswers: true,
    options: [
      { text: 'Analytical thinking and solving hard problems', value: 'strength_analytical', scores: { investigative: 4 } },
      { text: 'Creativity and generating fresh ideas', value: 'strength_creative', scores: { artistic: 4 } },
      { text: 'Communication, listening, and empathy', value: 'strength_people', scores: { social: 4 } },
      { text: 'Leadership, negotiation, and confidence', value: 'strength_leadership', scores: { enterprising: 4 } },
      { text: 'Execution, discipline, and reliability', value: 'strength_execution', scores: { conventional: 4 } },
      { text: 'Technical/hands-on troubleshooting', value: 'strength_technical', scores: { realistic: 4 } },
    ],
  },
  {
    id: 14,
    question: 'In projects, where do you usually contribute best? (Select all that apply)',
    category: 'strength',
    multipleAnswers: true,
    options: [
      { text: 'Data collection, analysis, and evidence-based decisions', value: 'project_data', scores: { investigative: 3, conventional: 1 } },
      { text: 'Visual design, branding, and storytelling', value: 'project_design', scores: { artistic: 3, enterprising: 1 } },
      { text: 'Planning schedules, budgets, and risk management', value: 'project_planning', scores: { conventional: 4 } },
      { text: 'Coordinating people and conflict resolution', value: 'project_people', scores: { social: 3, enterprising: 1 } },
      { text: 'Building, testing, and practical implementation', value: 'project_implementation', scores: { realistic: 3, investigative: 1 } },
      { text: 'Pitching ideas and presenting to audiences', value: 'project_presentation', scores: { enterprising: 3, social: 1 } },
    ],
  },
  {
    id: 15,
    question: 'Which of these tasks do you perform with confidence? (Select all that apply)',
    category: 'strength',
    multipleAnswers: true,
    options: [
      { text: 'Interpreting scientific findings and reports', value: 'conf_science', scores: { investigative: 3 } },
      { text: 'Writing persuasive arguments and policy briefs', value: 'conf_policy', scores: { social: 2, enterprising: 2 } },
      { text: 'Designing digital products, media, or campaigns', value: 'conf_digital', scores: { artistic: 3, investigative: 1 } },
      { text: 'Managing customer/client experiences professionally', value: 'conf_service', scores: { social: 2, conventional: 1, enterprising: 1 } },
      { text: 'Managing financial records and resource allocation', value: 'conf_finance', scores: { conventional: 3, enterprising: 1 } },
      { text: 'Using tools, machinery, or lab equipment safely', value: 'conf_tools', scores: { realistic: 3 } },
    ],
  },
  {
    id: 16,
    question: 'When learning new content, what helps you master it fastest? (Select all that apply)',
    category: 'strength',
    multipleAnswers: true,
    options: [
      { text: 'Case studies, research papers, and evidence', value: 'learn_research', scores: { investigative: 3 } },
      { text: 'Practical demonstrations and hands-on practice', value: 'learn_hands_on', scores: { realistic: 3 } },
      { text: 'Role play, collaboration, and discussion', value: 'learn_collab', scores: { social: 3 } },
      { text: 'Templates, structure, and repeatable systems', value: 'learn_structure', scores: { conventional: 3 } },
      { text: 'Creative exploration and open-ended tasks', value: 'learn_creative', scores: { artistic: 3 } },
      { text: 'Competitions, challenges, and goal targets', value: 'learn_competition', scores: { enterprising: 3 } },
    ],
  },
  {
    id: 17,
    question: 'What do you want people to remember your work for? (Select all that apply)',
    category: 'strength',
    multipleAnswers: true,
    options: [
      { text: 'Accuracy, compliance, and professional standards', value: 'legacy_quality', scores: { conventional: 3 } },
      { text: 'Innovation and breakthrough ideas', value: 'legacy_innovation', scores: { investigative: 2, artistic: 1 } },
      { text: 'Human impact and positive social change', value: 'legacy_impact', scores: { social: 3 } },
      { text: 'Business value and sustainable growth', value: 'legacy_growth', scores: { enterprising: 3 } },
      { text: 'Strong systems and practical infrastructure', value: 'legacy_systems', scores: { realistic: 3 } },
      { text: 'Creative excellence and memorable experiences', value: 'legacy_creative', scores: { artistic: 3 } },
    ],
  },
  {
    id: 18,
    question: 'Which capabilities do you want to build further in higher education/training? (Select all that apply)',
    category: 'strength',
    multipleAnswers: true,
    options: [
      { text: 'Clinical, counseling, or public health practice', value: 'grow_health', scores: { social: 2, investigative: 1 } },
      { text: 'Engineering, systems design, and problem solving', value: 'grow_engineering', scores: { realistic: 2, investigative: 1 } },
      { text: 'Entrepreneurship, management, and leadership', value: 'grow_leadership', scores: { enterprising: 3 } },
      { text: 'Teaching, facilitation, and curriculum delivery', value: 'grow_teaching', scores: { social: 2, conventional: 1 } },
      { text: 'Creative direction, media, and digital communication', value: 'grow_media', scores: { artistic: 3 } },
      { text: 'Law, governance, compliance, and administration', value: 'grow_governance', scores: { conventional: 2, social: 1 } },
    ],
  },
]

export const courseRecommendations: CareerRecommendation[] = [
  {
    id: '1',
    name: 'Bachelor of Medicine and Surgery (MBChB)',
    description: 'Train as a medical doctor to diagnose, treat, and improve public health outcomes.',
    universities: ['University of Nairobi', 'Moi University', 'Kenyatta University', 'Egerton University'],
    requirements: ['Mean Grade: A-', 'Biology: A', 'Chemistry: A', 'Mathematics/Physics: B+'],
    careers: ['Medical Doctor', 'Surgeon', 'Public Health Specialist', 'Medical Researcher'],
    matchScore: 0,
    category: 'Health Sciences',
  },
  {
    id: '2',
    name: 'Bachelor of Science in Nursing',
    description: 'Develop clinical and community care skills for patient-centered healthcare.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Mount Kenya University'],
    requirements: ['Mean Grade: B', 'Biology: B+', 'Chemistry: B', 'English: B'],
    careers: ['Registered Nurse', 'Nurse Educator', 'Community Health Nurse', 'Nurse Administrator'],
    matchScore: 0,
    category: 'Health Sciences',
  },
  {
    id: '3',
    name: 'Bachelor of Pharmacy',
    description: 'Learn medication science, pharmaceutical care, and drug safety management.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Jomo Kenyatta University of Agriculture and Technology', 'Mount Kenya University'],
    requirements: ['Mean Grade: A-', 'Biology: A-', 'Chemistry: A-', 'Math/Physics: B+'],
    careers: ['Pharmacist', 'Clinical Pharmacist', 'Regulatory Affairs Officer', 'Pharma Researcher'],
    matchScore: 0,
    category: 'Health Sciences',
  },
  {
    id: '4',
    name: 'Bachelor of Dental Surgery',
    description: 'Provide oral health care, diagnosis, and dental treatment services.',
    universities: ['University of Nairobi', 'Moi University', 'Kenyatta University'],
    requirements: ['Mean Grade: A-', 'Biology: A-', 'Chemistry: A-', 'Physics: B+'],
    careers: ['Dentist', 'Oral Health Specialist', 'Dental Surgeon', 'Dental Public Health Officer'],
    matchScore: 0,
    category: 'Health Sciences',
  },
  {
    id: '5',
    name: 'Bachelor of Science in Computer Science',
    description: 'Build software, intelligent systems, and secure digital platforms.',
    universities: ['University of Nairobi', 'Strathmore University', 'Jomo Kenyatta University of Agriculture and Technology', 'KCA University'],
    requirements: ['Mean Grade: B+', 'Mathematics: B+', 'Physics/Computer Studies: B'],
    careers: ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'Cloud Engineer'],
    matchScore: 0,
    category: 'Technology',
  },
  {
    id: '6',
    name: 'Bachelor of Science in Information Technology',
    description: 'Focus on enterprise systems, networks, and practical digital transformation.',
    universities: ['KCA University', 'Mount Kenya University', 'Zetech University', 'Maseno University'],
    requirements: ['Mean Grade: B-', 'Mathematics: C+', 'English: C+'],
    careers: ['IT Specialist', 'Systems Administrator', 'Network Engineer', 'Technical Consultant'],
    matchScore: 0,
    category: 'Technology',
  },
  {
    id: '7',
    name: 'Bachelor of Science in Data Science',
    description: 'Use statistics and machine learning to solve real-world decision problems.',
    universities: ['Strathmore University', 'University of Nairobi', 'KCA University', 'Dedan Kimathi University of Technology'],
    requirements: ['Mean Grade: B+', 'Mathematics: B+', 'English: B'],
    careers: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Business Intelligence Analyst'],
    matchScore: 0,
    category: 'Technology',
  },
  {
    id: '8',
    name: 'Bachelor of Science in Cyber Security',
    description: 'Defend systems, networks, and institutions against digital threats.',
    universities: ['KCA University', 'Strathmore University', 'Technical University of Kenya', 'Multimedia University of Kenya'],
    requirements: ['Mean Grade: B', 'Mathematics: B', 'Computer Studies/Physics: B-'],
    careers: ['Cybersecurity Analyst', 'SOC Specialist', 'Penetration Tester', 'Security Consultant'],
    matchScore: 0,
    category: 'Technology',
  },
  {
    id: '9',
    name: 'Bachelor of Engineering (Civil)',
    description: 'Design roads, bridges, water systems, and resilient infrastructure.',
    universities: ['University of Nairobi', 'Jomo Kenyatta University of Agriculture and Technology', 'Technical University of Kenya', 'Dedan Kimathi University of Technology'],
    requirements: ['Mean Grade: B+', 'Mathematics: A-', 'Physics: A-', 'Chemistry: B+'],
    careers: ['Civil Engineer', 'Structural Engineer', 'Project Engineer', 'Infrastructure Planner'],
    matchScore: 0,
    category: 'Engineering',
  },
  {
    id: '10',
    name: 'Bachelor of Engineering (Electrical & Electronic)',
    description: 'Build electrical systems, automation, and power technologies.',
    universities: ['University of Nairobi', 'Jomo Kenyatta University of Agriculture and Technology', 'Moi University', 'Technical University of Kenya'],
    requirements: ['Mean Grade: B+', 'Mathematics: A-', 'Physics: A-', 'Chemistry: B'],
    careers: ['Electrical Engineer', 'Control Systems Engineer', 'Power Engineer', 'Automation Specialist'],
    matchScore: 0,
    category: 'Engineering',
  },
  {
    id: '11',
    name: 'Bachelor of Engineering (Mechanical)',
    description: 'Design and optimize machines, manufacturing systems, and mechanical processes.',
    universities: ['University of Nairobi', 'Jomo Kenyatta University of Agriculture and Technology', 'Technical University of Kenya', 'Masinde Muliro University of Science and Technology'],
    requirements: ['Mean Grade: B+', 'Mathematics: A-', 'Physics: A-', 'Chemistry: B'],
    careers: ['Mechanical Engineer', 'Manufacturing Engineer', 'Maintenance Engineer', 'Design Engineer'],
    matchScore: 0,
    category: 'Engineering',
  },
  {
    id: '12',
    name: 'Bachelor of Science in Mechatronic Engineering',
    description: 'Combine mechanics, electronics, and intelligent automation systems.',
    universities: ['Jomo Kenyatta University of Agriculture and Technology', 'Dedan Kimathi University of Technology', 'Technical University of Kenya'],
    requirements: ['Mean Grade: B+', 'Mathematics: A-', 'Physics: A-', 'Chemistry: B'],
    careers: ['Mechatronics Engineer', 'Robotics Engineer', 'Automation Engineer', 'Embedded Systems Engineer'],
    matchScore: 0,
    category: 'Engineering',
  },
  {
    id: '13',
    name: 'Bachelor of Commerce',
    description: 'Build expertise in accounting, finance, marketing, and management.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Strathmore University', 'The Co-operative University of Kenya'],
    requirements: ['Mean Grade: B', 'Mathematics: B', 'English: B'],
    careers: ['Accountant', 'Financial Analyst', 'Business Consultant', 'Entrepreneur'],
    matchScore: 0,
    category: 'Business',
  },
  {
    id: '14',
    name: 'Bachelor of Economics',
    description: 'Analyze policy and markets for better economic decisions and planning.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Egerton University'],
    requirements: ['Mean Grade: B', 'Mathematics: B+', 'English: B'],
    careers: ['Economist', 'Policy Analyst', 'Research Analyst', 'Development Specialist'],
    matchScore: 0,
    category: 'Business',
  },
  {
    id: '15',
    name: 'Bachelor of Science in Actuarial Science',
    description: 'Apply advanced mathematics to insurance, risk, and financial systems.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Strathmore University', 'Jomo Kenyatta University of Agriculture and Technology'],
    requirements: ['Mean Grade: B+', 'Mathematics: A-', 'English: B'],
    careers: ['Actuary', 'Risk Analyst', 'Insurance Analyst', 'Investment Analyst'],
    matchScore: 0,
    category: 'Business',
  },
  {
    id: '16',
    name: 'Bachelor of Procurement and Supply Chain Management',
    description: 'Manage sourcing, logistics, and value chains across sectors.',
    universities: ['Jomo Kenyatta University of Agriculture and Technology', 'KCA University', 'Mount Kenya University', 'Maseno University'],
    requirements: ['Mean Grade: C+', 'Mathematics: C+', 'English: C+'],
    careers: ['Procurement Officer', 'Supply Chain Analyst', 'Logistics Manager', 'Operations Planner'],
    matchScore: 0,
    category: 'Business',
  },
  {
    id: '17',
    name: 'Bachelor of Laws (LLB)',
    description: 'Build legal expertise for advocacy, policy, and justice systems.',
    universities: ['University of Nairobi', 'Strathmore University', 'Kenyatta University', 'Riara University'],
    requirements: ['Mean Grade: B+', 'English: B+', 'History/CRE: B'],
    careers: ['Advocate', 'Legal Officer', 'Corporate Counsel', 'Policy Advisor'],
    matchScore: 0,
    category: 'Law & Governance',
  },
  {
    id: '18',
    name: 'Bachelor of Public Administration',
    description: 'Prepare for leadership in government, county, and public institutions.',
    universities: ['Kenyatta University', 'Maseno University', 'Kisii University', 'South Eastern Kenya University'],
    requirements: ['Mean Grade: C+', 'English: C+', 'History/Business: C+'],
    careers: ['Public Administrator', 'County Officer', 'Policy Implementation Officer', 'Program Manager'],
    matchScore: 0,
    category: 'Law & Governance',
  },
  {
    id: '19',
    name: 'Bachelor of Criminology and Security Studies',
    description: 'Study crime prevention, justice systems, and public security management.',
    universities: ['Kenyatta University', 'Egerton University', 'Masinde Muliro University of Science and Technology', 'Kisii University'],
    requirements: ['Mean Grade: C+', 'English: C+', 'History/CRE: C+'],
    careers: ['Criminologist', 'Security Analyst', 'Investigator', 'Corrections Officer'],
    matchScore: 0,
    category: 'Law & Governance',
  },
  {
    id: '20',
    name: 'Bachelor of Education (Science)',
    description: 'Teach science subjects while shaping the next generation of learners.',
    universities: ['Kenyatta University', 'Moi University', 'Egerton University', 'Maseno University'],
    requirements: ['Mean Grade: C+', 'Teaching Subjects: C+'],
    careers: ['Science Teacher', 'Curriculum Developer', 'Education Officer', 'School Administrator'],
    matchScore: 0,
    category: 'Education',
  },
  {
    id: '21',
    name: 'Bachelor of Education (Arts)',
    description: 'Train as an educator in humanities, language, and social disciplines.',
    universities: ['Kenyatta University', 'Moi University', 'Maseno University', 'Karatina University'],
    requirements: ['Mean Grade: C+', 'Teaching Subjects: C+'],
    careers: ['Arts Teacher', 'Education Consultant', 'Curriculum Specialist', 'Instructional Designer'],
    matchScore: 0,
    category: 'Education',
  },
  {
    id: '22',
    name: 'Bachelor of Early Childhood Education',
    description: 'Focus on child development and foundational learning pedagogy.',
    universities: ['Kenyatta University', 'Mount Kenya University', 'Catholic University of Eastern Africa', 'Machakos University'],
    requirements: ['Mean Grade: C+', 'English/Kiswahili: C+'],
    careers: ['Early Years Teacher', 'Child Development Specialist', 'Pre-school Director', 'Learning Support Specialist'],
    matchScore: 0,
    category: 'Education',
  },
  {
    id: '23',
    name: 'Bachelor of Psychology',
    description: 'Understand behavior, mental processes, and evidence-based interventions.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Daystar University', 'United States International University - Africa'],
    requirements: ['Mean Grade: B', 'Biology: B', 'English: B'],
    careers: ['Counseling Psychologist', 'HR Specialist', 'Behavioral Researcher', 'Mental Health Advocate'],
    matchScore: 0,
    category: 'Social Sciences',
  },
  {
    id: '24',
    name: 'Bachelor of Social Work',
    description: 'Serve communities through social support, advocacy, and development programs.',
    universities: ['University of Nairobi', 'Maseno University', 'Kisii University', 'Kenya Methodist University'],
    requirements: ['Mean Grade: C+', 'English/Kiswahili: C+'],
    careers: ['Social Worker', 'Community Development Officer', 'Case Manager', 'NGO Program Officer'],
    matchScore: 0,
    category: 'Social Sciences',
  },
  {
    id: '25',
    name: 'Bachelor of International Relations',
    description: 'Study diplomacy, regional integration, and global policy dynamics.',
    universities: ['United States International University - Africa', 'University of Nairobi', 'Kenyatta University', 'Strathmore University'],
    requirements: ['Mean Grade: B', 'English: B+', 'History/Geography: B'],
    careers: ['Diplomat', 'Foreign Affairs Analyst', 'Policy Researcher', 'International Program Officer'],
    matchScore: 0,
    category: 'Social Sciences',
  },
  {
    id: '26',
    name: 'Bachelor of Arts in Journalism and Media Studies',
    description: 'Develop modern storytelling, reporting, and multimedia production skills.',
    universities: ['University of Nairobi', 'Daystar University', 'Multimedia University of Kenya', 'Catholic University of Eastern Africa'],
    requirements: ['Mean Grade: B-', 'English: B'],
    careers: ['Journalist', 'Media Producer', 'News Editor', 'Content Strategist'],
    matchScore: 0,
    category: 'Arts & Media',
  },
  {
    id: '27',
    name: 'Bachelor of Film and Animation',
    description: 'Create visual narratives in film, animation, and digital production.',
    universities: ['Multimedia University of Kenya', 'United States International University - Africa', 'Kenyatta University', 'Technical University of Kenya'],
    requirements: ['Mean Grade: C+', 'English: C+', 'Art/Computer Studies: C+'],
    careers: ['Animator', 'Film Producer', 'Motion Graphics Designer', 'Video Editor'],
    matchScore: 0,
    category: 'Arts & Media',
  },
  {
    id: '28',
    name: 'Bachelor of Fashion Design and Marketing',
    description: 'Blend creative design with branding, production, and fashion enterprise.',
    universities: ['Kenyatta University', 'Technical University of Kenya', 'Mount Kenya University', 'Riara University'],
    requirements: ['Mean Grade: C+', 'Art & Design/Home Science: C+'],
    careers: ['Fashion Designer', 'Creative Director', 'Fashion Merchandiser', 'Brand Manager'],
    matchScore: 0,
    category: 'Arts & Media',
  },
  {
    id: '29',
    name: 'Bachelor of Science in Agriculture',
    description: 'Advance food systems, crop production, and sustainable agribusiness.',
    universities: ['Egerton University', 'University of Nairobi', 'Jomo Kenyatta University of Agriculture and Technology', 'Moi University'],
    requirements: ['Mean Grade: B', 'Biology: B+', 'Chemistry: B', 'Agriculture: B'],
    careers: ['Agricultural Officer', 'Farm Manager', 'Agribusiness Consultant', 'Agri Researcher'],
    matchScore: 0,
    category: 'Agriculture & Environment',
  },
  {
    id: '30',
    name: 'Bachelor of Environmental Science',
    description: 'Develop solutions for conservation, climate, and environmental policy.',
    universities: ['University of Nairobi', 'Kenyatta University', 'Maseno University', 'Pwani University'],
    requirements: ['Mean Grade: B-', 'Biology/Chemistry/Geography: B-'],
    careers: ['Environmental Scientist', 'Conservation Officer', 'ESG Analyst', 'Environmental Consultant'],
    matchScore: 0,
    category: 'Agriculture & Environment',
  },
  {
    id: '31',
    name: 'Bachelor of Science in Wildlife Management',
    description: 'Manage biodiversity, protected areas, and wildlife ecosystems.',
    universities: ['University of Nairobi', 'Kenyatta University', 'South Eastern Kenya University', 'Chuka University'],
    requirements: ['Mean Grade: C+', 'Biology/Geography: C+'],
    careers: ['Wildlife Officer', 'Park Manager', 'Conservation Scientist', 'Ecotourism Specialist'],
    matchScore: 0,
    category: 'Agriculture & Environment',
  },
  {
    id: '32',
    name: 'Bachelor of Architecture',
    description: 'Design functional and inspiring built spaces for communities and cities.',
    universities: ['University of Nairobi', 'Jomo Kenyatta University of Agriculture and Technology', 'Technical University of Kenya'],
    requirements: ['Mean Grade: B+', 'Mathematics: B+', 'Physics: B+', 'Art & Design: B-'],
    careers: ['Architect', 'Urban Designer', 'Interior Architect', 'Built Environment Consultant'],
    matchScore: 0,
    category: 'Built Environment',
  },
  {
    id: '33',
    name: 'Bachelor of Quantity Surveying',
    description: 'Manage project costs, contracts, and value optimization in construction.',
    universities: ['University of Nairobi', 'Technical University of Kenya', 'Jomo Kenyatta University of Agriculture and Technology'],
    requirements: ['Mean Grade: B', 'Mathematics: B+', 'Physics/Business: B'],
    careers: ['Quantity Surveyor', 'Cost Engineer', 'Contracts Manager', 'Construction Consultant'],
    matchScore: 0,
    category: 'Built Environment',
  },
  {
    id: '34',
    name: 'Bachelor of Urban and Regional Planning',
    description: 'Plan sustainable cities, transport, and land-use systems.',
    universities: ['University of Nairobi', 'Technical University of Kenya', 'Maseno University', 'Jomo Kenyatta University of Agriculture and Technology'],
    requirements: ['Mean Grade: B-', 'Mathematics/Geography: B-'],
    careers: ['Urban Planner', 'Transport Planner', 'GIS Analyst', 'Development Planner'],
    matchScore: 0,
    category: 'Built Environment',
  },
  {
    id: '35',
    name: 'Bachelor of Science in Hospitality Management',
    description: 'Lead modern hotel, service, and guest experience operations.',
    universities: ['Kenyatta University', 'Moi University', 'United States International University - Africa', 'Technical University of Kenya'],
    requirements: ['Mean Grade: C+', 'English: C+', 'Mathematics: C+'],
    careers: ['Hotel Manager', 'Guest Experience Manager', 'Event Coordinator', 'Hospitality Entrepreneur'],
    matchScore: 0,
    category: 'Hospitality & Tourism',
  },
  {
    id: '36',
    name: 'Bachelor of Tourism Management',
    description: 'Plan and manage tourism products, destinations, and travel services.',
    universities: ['Moi University', 'Kenyatta University', 'Technical University of Kenya', 'Mount Kenya University'],
    requirements: ['Mean Grade: C+', 'English: C+', 'Geography/Business: C+'],
    careers: ['Tourism Officer', 'Destination Manager', 'Travel Consultant', 'Tour Operations Manager'],
    matchScore: 0,
    category: 'Hospitality & Tourism',
  },
  {
    id: '37',
    name: 'Bachelor of Science in Food Science and Technology',
    description: 'Ensure food quality, safety, innovation, and processing excellence.',
    universities: ['Jomo Kenyatta University of Agriculture and Technology', 'Egerton University', 'University of Nairobi', 'Kenyatta University'],
    requirements: ['Mean Grade: B', 'Biology: B', 'Chemistry: B+', 'Mathematics: B'],
    careers: ['Food Technologist', 'Quality Assurance Specialist', 'Food Safety Officer', 'Product Developer'],
    matchScore: 0,
    category: 'Hospitality & Tourism',
  },
  {
    id: '38',
    name: 'Bachelor of Science in Aviation Management',
    description: 'Manage aviation operations, safety systems, and airport services.',
    universities: ['Technical University of Kenya', 'Moi University', 'Mount Kenya University', 'KCA University'],
    requirements: ['Mean Grade: C+', 'Mathematics: C+', 'English: C+'],
    careers: ['Aviation Operations Officer', 'Airport Planner', 'Airline Operations Analyst', 'Safety Coordinator'],
    matchScore: 0,
    category: 'Aviation & Maritime',
  },
  {
    id: '39',
    name: 'Bachelor of Science in Marine Engineering',
    description: 'Design and maintain marine propulsion and vessel engineering systems.',
    universities: ['Jomo Kenyatta University of Agriculture and Technology', 'Technical University of Kenya', 'Pwani University'],
    requirements: ['Mean Grade: B', 'Mathematics: B+', 'Physics: B+', 'Chemistry: B'],
    careers: ['Marine Engineer', 'Port Technical Officer', 'Ship Maintenance Engineer', 'Marine Systems Specialist'],
    matchScore: 0,
    category: 'Aviation & Maritime',
  },
  {
    id: '40',
    name: 'Bachelor of Science in Sports Science',
    description: 'Apply science to athlete performance, wellness, and sport development.',
    universities: ['Kenyatta University', 'University of Nairobi', 'Moi University', 'Masinde Muliro University of Science and Technology'],
    requirements: ['Mean Grade: C+', 'Biology/PE (if taken): C+'],
    careers: ['Sports Scientist', 'Performance Analyst', 'Strength & Conditioning Coach', 'Wellness Specialist'],
    matchScore: 0,
    category: 'Sports & Recreation',
  },
  {
    id: '41',
    name: 'Diploma in Software Development',
    description: 'Build practical programming, web, and app development skills for industry-ready roles.',
    universities: ['KCA University', 'Zetech University', 'Technical University of Kenya', 'Multimedia University of Kenya'],
    requirements: ['Mean Grade: C', 'Mathematics: C', 'English: C'],
    careers: ['Junior Developer', 'Web Developer', 'QA Tester', 'Technical Support Developer'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '42',
    name: 'Diploma in Electrical and Electronics Engineering',
    description: 'Gain hands-on competence in electrical systems, controls, and equipment maintenance.',
    universities: ['Technical University of Kenya', 'Kabete National Polytechnic', 'Nyeri National Polytechnic', 'Eldoret National Polytechnic'],
    requirements: ['Mean Grade: C', 'Mathematics: C-', 'Physics: C-'],
    careers: ['Electrical Technician', 'Maintenance Technician', 'Control Panel Technician', 'Field Service Technician'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '43',
    name: 'Diploma in Civil Engineering',
    description: 'Train in surveying, construction supervision, and applied site engineering skills.',
    universities: ['Technical University of Kenya', 'Nairobi Technical Training Institute', 'Kisumu National Polytechnic', 'Meru National Polytechnic'],
    requirements: ['Mean Grade: C', 'Mathematics: C-', 'Physics: C-'],
    careers: ['Site Technician', 'Survey Technician', 'Construction Supervisor', 'CAD Technician'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '44',
    name: 'Diploma in Automotive Engineering',
    description: 'Develop practical expertise in diagnostics, servicing, and automotive systems.',
    universities: ['Kenya Coast National Polytechnic', 'Nyeri National Polytechnic', 'Rift Valley Technical Training Institute', 'Machakos University TVET Institute'],
    requirements: ['Mean Grade: C-', 'Mathematics/Physics: C-'],
    careers: ['Automotive Technician', 'Diagnostic Technician', 'Workshop Supervisor', 'Service Advisor'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '45',
    name: 'Diploma in Culinary Arts',
    description: 'Master kitchen operations, pastry, food production, and hospitality service standards.',
    universities: ['Kenya Utalii College', 'Technical University of Kenya', 'Boma International Hospitality College', 'KCA University'],
    requirements: ['Mean Grade: C-', 'English: C-'],
    careers: ['Chef', 'Pastry Chef', 'Kitchen Supervisor', 'Catering Manager'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '46',
    name: 'Diploma in Fashion Design and Garment Making',
    description: 'Build practical design, pattern-making, and apparel production skills.',
    universities: ['Kenya Technical Trainers College', 'Karen Technical Training Institute for the Deaf', 'Kabete National Polytechnic', 'Nyeri National Polytechnic'],
    requirements: ['Mean Grade: C-', 'Art/Home Science (if taken): C-'],
    careers: ['Fashion Designer', 'Pattern Maker', 'Production Assistant', 'Apparel Entrepreneur'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '47',
    name: 'Diploma in Community Health and Development',
    description: 'Prepare for frontline health promotion, outreach, and community-based interventions.',
    universities: ['Kenya Medical Training College', 'Mount Kenya University', 'Kenya Methodist University', 'Kisii University'],
    requirements: ['Mean Grade: C', 'Biology: C-', 'English/Kiswahili: C-'],
    careers: ['Community Health Assistant', 'Public Health Technician', 'NGO Field Officer', 'Health Outreach Coordinator'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '48',
    name: 'Diploma in Accountancy',
    description: 'Learn bookkeeping, taxation basics, and practical financial reporting skills.',
    universities: ['KCA University', 'The Co-operative University of Kenya', 'Kenya School of Monetary Studies', 'Nairobi Institute of Business Studies'],
    requirements: ['Mean Grade: C', 'Mathematics: C-', 'English: C-'],
    careers: ['Accounts Assistant', 'Bookkeeper', 'Payroll Officer', 'Finance Clerk'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '49',
    name: 'Diploma in Journalism and Digital Media',
    description: 'Gain practical production skills for broadcast, online journalism, and digital storytelling.',
    universities: ['Multimedia University of Kenya', 'Daystar University', 'Zetech University', 'Kenya Institute of Mass Communication'],
    requirements: ['Mean Grade: C', 'English/Kiswahili: C'],
    careers: ['Reporter', 'Content Producer', 'Video Editor', 'Social Media Producer'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
  {
    id: '50',
    name: 'Diploma in Refrigeration and Air Conditioning',
    description: 'Train in installation, troubleshooting, and maintenance of cooling systems.',
    universities: ['Kabete National Polytechnic', 'Kisumu National Polytechnic', 'Eldoret National Polytechnic', 'Mombasa Technical Training Institute'],
    requirements: ['Mean Grade: C-', 'Mathematics/Physics: D+'],
    careers: ['HVAC Technician', 'Refrigeration Installer', 'Maintenance Technician', 'Field Service Technician'],
    matchScore: 0,
    category: 'TVET & Applied Skills',
  },
]

type ScoreKey = 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional'
type ScoreWeights = Partial<Record<ScoreKey, number>>

const categoryWeights: Record<string, ScoreWeights> = {
  'Health Sciences': { investigative: 0.4, social: 0.4, realistic: 0.2 },
  Technology: { investigative: 0.45, conventional: 0.25, realistic: 0.2, enterprising: 0.1 },
  Engineering: { realistic: 0.4, investigative: 0.35, conventional: 0.15, artistic: 0.1 },
  Business: { enterprising: 0.4, conventional: 0.3, social: 0.2, investigative: 0.1 },
  'Law & Governance': { social: 0.35, enterprising: 0.3, investigative: 0.2, conventional: 0.15 },
  Education: { social: 0.45, conventional: 0.2, artistic: 0.2, investigative: 0.15 },
  'Social Sciences': { social: 0.35, investigative: 0.3, enterprising: 0.2, artistic: 0.15 },
  'Arts & Media': { artistic: 0.5, social: 0.2, enterprising: 0.2, investigative: 0.1 },
  'Agriculture & Environment': { realistic: 0.35, investigative: 0.35, social: 0.15, conventional: 0.15 },
  'Built Environment': { realistic: 0.35, investigative: 0.3, artistic: 0.2, conventional: 0.15 },
  'Hospitality & Tourism': { social: 0.35, enterprising: 0.3, artistic: 0.2, conventional: 0.15 },
  'Aviation & Maritime': { realistic: 0.4, conventional: 0.25, investigative: 0.25, social: 0.1 },
  'Sports & Recreation': { social: 0.3, realistic: 0.3, enterprising: 0.2, investigative: 0.2 },
  'TVET & Applied Skills': { realistic: 0.35, conventional: 0.25, enterprising: 0.2, social: 0.1, investigative: 0.1 },
}

export function calculateRecommendations(scores: {
  realistic: number
  investigative: number
  artistic: number
  social: number
  enterprising: number
  conventional: number
}): CareerRecommendation[] {
  const maxTraitScore = Math.max(...Object.values(scores), 1)

  const normalizedScores = {
    realistic: scores.realistic / maxTraitScore,
    investigative: scores.investigative / maxTraitScore,
    artistic: scores.artistic / maxTraitScore,
    social: scores.social / maxTraitScore,
    enterprising: scores.enterprising / maxTraitScore,
    conventional: scores.conventional / maxTraitScore,
  }

  const courseMatches = courseRecommendations.map((course) => {
    const weights = categoryWeights[course.category] || {
      realistic: 1 / 6,
      investigative: 1 / 6,
      artistic: 1 / 6,
      social: 1 / 6,
      enterprising: 1 / 6,
      conventional: 1 / 6,
    }

    let weightedScore = 0

    ;(Object.keys(weights) as ScoreKey[]).forEach((key) => {
      weightedScore += normalizedScores[key] * (weights[key] || 0)
    })

    return {
      ...course,
      matchScore: Math.round(weightedScore * 100),
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

  const [first, second, third] = types
  const gapOneTwo = first.score - second.score
  const gapTwoThree = second.score - third.score

  if (gapOneTwo >= 8) {
    return first.type
  }

  if (gapTwoThree >= 5) {
    return `${first.type}-${second.type}`
  }

  return `${first.type}-${second.type}-${third.type}`
}

export const personalityDescriptions: Record<string, string> = {
  Realistic: 'You prefer practical, hands-on problem solving and enjoy seeing tangible outcomes from your work.',
  Investigative: 'You are analytical, curious, and motivated by deep understanding, evidence, and discovery.',
  Artistic: 'You are creative and expressive, and you excel when imagination and originality are valued.',
  Social: 'You care about people, collaboration, and impact, and you thrive in service-oriented roles.',
  Enterprising: 'You are driven by leadership, influence, initiative, and creating opportunities.',
  Conventional: 'You are organized and dependable, and you perform strongly in structured systems and operations.',
}

const customAnswerKeywordMap: Record<'interest' | 'strength', Array<{ keywords: string[]; scores: Partial<Record<ScoreKey, number>> }>> = {
  interest: [
    { keywords: ['code', 'coding', 'software', 'app', 'technology', 'ai', 'data', 'computer'], scores: { investigative: 2, conventional: 1 } },
    { keywords: ['health', 'medical', 'nursing', 'doctor', 'mental', 'counsel'], scores: { social: 2, investigative: 1 } },
    { keywords: ['business', 'entrepreneur', 'sales', 'startup', 'marketing', 'finance'], scores: { enterprising: 2, conventional: 1 } },
    { keywords: ['design', 'music', 'art', 'film', 'creative', 'fashion', 'media'], scores: { artistic: 2, enterprising: 1 } },
    { keywords: ['build', 'repair', 'machine', 'technical', 'engineering', 'electric'], scores: { realistic: 2, investigative: 1 } },
    { keywords: ['law', 'policy', 'justice', 'human rights', 'governance'], scores: { social: 1, enterprising: 1, conventional: 1 } },
    { keywords: ['teach', 'education', 'mentor', 'coach', 'community', 'volunteer'], scores: { social: 2, conventional: 1 } },
    { keywords: ['agriculture', 'farming', 'environment', 'wildlife', 'climate'], scores: { realistic: 2, investigative: 1 } },
  ],
  strength: [
    { keywords: ['organize', 'planning', 'schedule', 'detail', 'accuracy', 'records'], scores: { conventional: 2 } },
    { keywords: ['lead', 'sell', 'influence', 'present', 'negotiate'], scores: { enterprising: 2, social: 1 } },
    { keywords: ['empathy', 'listen', 'support', 'care', 'guide'], scores: { social: 2 } },
    { keywords: ['analyze', 'research', 'logic', 'solve', 'critical'], scores: { investigative: 2 } },
    { keywords: ['design', 'creative', 'story', 'write', 'visual'], scores: { artistic: 2 } },
    { keywords: ['fix', 'build', 'hands-on', 'practical', 'tools'], scores: { realistic: 2 } },
  ],
}

export function inferCustomAnswerScores(
  answer: string,
  category: 'personality' | 'interest' | 'strength'
): Partial<Record<ScoreKey, number>> {
  const normalized = answer.toLowerCase().trim()

  if (!normalized || category === 'personality') {
    return {}
  }

  const matches = customAnswerKeywordMap[category].filter((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  )

  if (matches.length === 0) {
    return category === 'interest'
      ? { investigative: 1, social: 1 }
      : { conventional: 1, enterprising: 1 }
  }

  const combined: Partial<Record<ScoreKey, number>> = {}
  matches.forEach((match) => {
    Object.entries(match.scores).forEach(([key, value]) => {
      const scoreKey = key as ScoreKey
      combined[scoreKey] = (combined[scoreKey] || 0) + (value || 0)
    })
  })

  return combined
}

export function getPersonalityArchetype(scores: {
  realistic: number
  investigative: number
  artistic: number
  social: number
  enterprising: number
  conventional: number
}): { name: string; code: string; summary: string } {
  const ordered = [
    { code: 'Realistic', score: scores.realistic },
    { code: 'Investigative', score: scores.investigative },
    { code: 'Artistic', score: scores.artistic },
    { code: 'Social', score: scores.social },
    { code: 'Enterprising', score: scores.enterprising },
    { code: 'Conventional', score: scores.conventional },
  ].sort((a, b) => b.score - a.score)

  const key = `${ordered[0].code}-${ordered[1].code}`

  const archetypes: Record<string, { name: string; summary: string }> = {
    'Investigative-Realistic': {
      name: 'The Systems Innovator',
      summary: 'You solve practical problems using logic, experimentation, and applied technical thinking.',
    },
    'Investigative-Conventional': {
      name: 'The Precision Analyst',
      summary: 'You combine deep analysis with structure, making you strong in data-heavy and evidence-based work.',
    },
    'Social-Investigative': {
      name: 'The Human-Centered Problem Solver',
      summary: 'You use evidence and empathy together to improve people-focused systems and services.',
    },
    'Enterprising-Social': {
      name: 'The Community Leader',
      summary: 'You lead with influence and people skills, often excelling in impact-driven leadership roles.',
    },
    'Artistic-Enterprising': {
      name: 'The Creative Strategist',
      summary: 'You pair originality with initiative, ideal for media, brand, design, and innovation roles.',
    },
    'Conventional-Enterprising': {
      name: 'The Operations Architect',
      summary: 'You transform ideas into organized execution through planning, systems, and accountability.',
    },
  }

  const selected = archetypes[key] || {
    name: `The ${ordered[0].code} Explorer`,
    summary: `Your strongest trait is ${ordered[0].code}, supported by ${ordered[1].code}. This gives you a unique and adaptable profile.`,
  }

  return {
    name: selected.name,
    code: `${ordered[0].code}-${ordered[1].code}`,
    summary: selected.summary,
  }
}

export function getReadableLabel(value: string): string {
  const labelMap: Record<string, string> = {
    math_stats: 'Math, statistics, or accounting',
    bio_health: 'Biology, chemistry, or health sciences',
    physics_tech: 'Physics, engineering, or technical studies',
    business_econ: 'Business, economics, or entrepreneurship',
    language_comm: 'Literature, languages, or communication',
    law_governance: 'History, law, governance, or civic studies',
    agri_env: 'Agriculture, environment, or geography',
    creative_arts: 'Art, design, music, film, or drama',
  }

  return labelMap[value] || value.split('_').map((word) => (
    word.charAt(0).toUpperCase() + word.slice(1)
  )).join(' ')
}
