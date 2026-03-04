import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CourseCard } from '@/components/recommendations/course-card'
import type { CareerRecommendation } from '@/lib/types'

const mockCourse: CareerRecommendation = {
  id: 'c1',
  name: 'Computer Science',
  description: 'Study of computation and information processing.',
  universities: ['University of Nairobi', 'Kenyatta University'],
  requirements: ['B+ in Mathematics', 'B in English'],
  careers: ['Software Engineer', 'Data Analyst'],
  matchScore: 85,
  category: 'Technology',
}

describe('CourseCard', () => {
  it('renders course name and description', () => {
    render(<CourseCard course={mockCourse} rank={1} />)
    expect(screen.getByText('Computer Science')).toBeInTheDocument()
    expect(screen.getByText('Study of computation and information processing.')).toBeInTheDocument()
  })

  it('displays match score', () => {
    render(<CourseCard course={mockCourse} rank={1} />)
    expect(screen.getByText('85% Match')).toBeInTheDocument()
  })

  it('shows category badge', () => {
    render(<CourseCard course={mockCourse} rank={1} />)
    expect(screen.getByText('Technology')).toBeInTheDocument()
  })

  it('shows first university and +N more count', () => {
    render(<CourseCard course={mockCourse} rank={4} />)
    expect(screen.getByText('University of Nairobi')).toBeInTheDocument()
    expect(screen.getByText('+1 more')).toBeInTheDocument()
  })

  it('shows trophy icon for rank 1', () => {
    const { container } = render(<CourseCard course={mockCourse} rank={1} />)
    // Rank 1 renders a Trophy icon instead of a number
    const rankBadge = container.querySelector('.absolute')
    expect(rankBadge).toBeInTheDocument()
  })

  it('shows rank number for ranks 2 and 3', () => {
    render(<CourseCard course={mockCourse} rank={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('hides rank badge for rank > 3', () => {
    const { container } = render(<CourseCard course={mockCourse} rank={5} />)
    const rankBadge = container.querySelector('.absolute')
    expect(rankBadge).toBeNull()
  })

  it('has a View Details button', () => {
    render(<CourseCard course={mockCourse} rank={1} />)
    expect(screen.getByText('View Details')).toBeInTheDocument()
  })
})
