import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CourseFilters } from '@/components/recommendations/course-filters'

describe('CourseFilters', () => {
  const categories = ['all', 'Engineering', 'Health', 'Business']
  const defaultProps = {
    categories,
    selectedCategory: 'all',
    onCategoryChange: vi.fn(),
    sortBy: 'match' as const,
    onSortChange: vi.fn(),
    resultCount: 12,
  }

  it('renders all category buttons', () => {
    render(<CourseFilters {...defaultProps} />)

    expect(screen.getByText('All Courses')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(screen.getByText('Health')).toBeInTheDocument()
    expect(screen.getByText('Business')).toBeInTheDocument()
  })

  it('shows result count', () => {
    render(<CourseFilters {...defaultProps} />)
    expect(screen.getByText('12 courses found')).toBeInTheDocument()
  })

  it('shows singular "course" for count of 1', () => {
    render(<CourseFilters {...defaultProps} resultCount={1} />)
    expect(screen.getByText('1 course found')).toBeInTheDocument()
  })

  it('calls onCategoryChange when a category is clicked', () => {
    const onCategoryChange = vi.fn()
    render(<CourseFilters {...defaultProps} onCategoryChange={onCategoryChange} />)

    fireEvent.click(screen.getByText('Engineering'))
    expect(onCategoryChange).toHaveBeenCalledWith('Engineering')
  })
})
