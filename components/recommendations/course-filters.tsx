'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { SlidersHorizontal } from 'lucide-react'

interface CourseFiltersProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: 'match' | 'name'
  onSortChange: (sort: 'match' | 'name') => void
  resultCount: number
}

export function CourseFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}: CourseFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              'capitalize',
              selectedCategory === category && 'bg-primary text-primary-foreground'
            )}
          >
            {category === 'all' ? 'All Courses' : category}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {resultCount} course{resultCount !== 1 ? 's' : ''} found
        </span>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(v) => onSortChange(v as 'match' | 'name')}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
