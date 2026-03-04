import { describe, it, expect } from 'vitest'
import {
  calculateRecommendations,
  getPersonalityType,
  getPersonalityArchetype,
  inferCustomAnswerScores,
  getReadableLabel,
  assessmentQuestions,
  courseRecommendations,
  kenyanUniversities,
  kcseSubjects,
  grades,
  counties,
  personalityDescriptions,
} from '@/lib/career-data'

// ---------------------------------------------------------------------------
// Static data integrity
// ---------------------------------------------------------------------------
describe('static data exports', () => {
  it('kenyanUniversities has entries', () => {
    expect(kenyanUniversities.length).toBeGreaterThan(0)
    kenyanUniversities.forEach((u) => expect(typeof u).toBe('string'))
  })

  it('kcseSubjects has at least 10 subjects', () => {
    expect(kcseSubjects.length).toBeGreaterThanOrEqual(10)
  })

  it('grades are ordered A → E', () => {
    expect(grades[0]).toBe('A')
    expect(grades[grades.length - 1]).toBe('E')
  })

  it('counties has at least 20 entries', () => {
    expect(counties.length).toBeGreaterThanOrEqual(20)
  })

  it('assessmentQuestions each have id, question, category, and at least 2 options', () => {
    assessmentQuestions.forEach((q) => {
      expect(q.id).toBeTypeOf('number')
      expect(q.question).toBeTypeOf('string')
      expect(['personality', 'interest', 'strength']).toContain(q.category)
      expect(q.options.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('assessmentQuestions ids are unique', () => {
    const ids = assessmentQuestions.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('courseRecommendations each have required fields', () => {
    courseRecommendations.forEach((c) => {
      expect(c.id).toBeTypeOf('string')
      expect(c.name).toBeTypeOf('string')
      expect(c.description).toBeTypeOf('string')
      expect(c.universities.length).toBeGreaterThan(0)
      expect(c.requirements.length).toBeGreaterThan(0)
      expect(c.careers.length).toBeGreaterThan(0)
      expect(c.category).toBeTypeOf('string')
    })
  })

  it('personalityDescriptions covers all 6 RIASEC types', () => {
    const types = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional']
    types.forEach((t) => {
      expect(personalityDescriptions[t]).toBeTypeOf('string')
      expect(personalityDescriptions[t].length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// getPersonalityType
// ---------------------------------------------------------------------------
describe('getPersonalityType', () => {
  const zeroScores = { realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0 }

  it('returns single type when one score dominates (gap >= 8)', () => {
    const result = getPersonalityType({ ...zeroScores, realistic: 25, investigative: 10 })
    expect(result).toBe('Realistic')
  })

  it('returns two types when top two are close but third is far', () => {
    const result = getPersonalityType({
      ...zeroScores,
      social: 20,
      enterprising: 18,
      artistic: 5,
    })
    expect(result).toBe('Social-Enterprising')
  })

  it('returns three types when top three are close', () => {
    const result = getPersonalityType({
      ...zeroScores,
      investigative: 20,
      artistic: 18,
      social: 16,
    })
    expect(result).toBe('Investigative-Artistic-Social')
  })

  it('handles all zeros', () => {
    const result = getPersonalityType(zeroScores)
    // All tied — should return three types (first three alphabetically by sort stability)
    expect(result).toBeTypeOf('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('handles equal top two with large gap to third', () => {
    const result = getPersonalityType({
      ...zeroScores,
      conventional: 20,
      enterprising: 20,
      realistic: 5,
    })
    // Gap between first and second = 0 (< 8), gap between second and third = 15 (>= 5)
    expect(result.split('-')).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// calculateRecommendations
// ---------------------------------------------------------------------------
describe('calculateRecommendations', () => {
  const balanced = { realistic: 10, investigative: 10, artistic: 10, social: 10, enterprising: 10, conventional: 10 }

  it('returns all courseRecommendations (same length)', () => {
    const recs = calculateRecommendations(balanced)
    expect(recs.length).toBe(courseRecommendations.length)
  })

  it('each recommendation has a numeric matchScore 0-100', () => {
    const recs = calculateRecommendations(balanced)
    recs.forEach((r) => {
      expect(r.matchScore).toBeTypeOf('number')
      expect(r.matchScore).toBeGreaterThanOrEqual(0)
      expect(r.matchScore).toBeLessThanOrEqual(100)
    })
  })

  it('returns results sorted by matchScore descending', () => {
    const recs = calculateRecommendations({ ...balanced, investigative: 50 })
    for (let i = 1; i < recs.length; i++) {
      expect(recs[i - 1].matchScore).toBeGreaterThanOrEqual(recs[i].matchScore)
    }
  })

  it('high realistic score favours engineering/technical courses', () => {
    const recs = calculateRecommendations({
      realistic: 50,
      investigative: 5,
      artistic: 5,
      social: 5,
      enterprising: 5,
      conventional: 5,
    })
    const topNames = recs.slice(0, 5).map((r) => r.category.toLowerCase())
    const hasTechCategory = topNames.some(
      (c) => c.includes('engineering') || c.includes('technology') || c.includes('stem') || c.includes('technical')
    )
    expect(hasTechCategory).toBe(true)
  })

  it('high social score favours social/education/health courses', () => {
    const recs = calculateRecommendations({
      realistic: 5,
      investigative: 5,
      artistic: 5,
      social: 50,
      enterprising: 5,
      conventional: 5,
    })
    const topCategories = recs.slice(0, 5).map((r) => r.category.toLowerCase())
    const hasSocialCategory = topCategories.some(
      (c) => c.includes('social') || c.includes('health') || c.includes('education') || c.includes('humanities')
    )
    expect(hasSocialCategory).toBe(true)
  })

  it('handles all-zero scores without crashing', () => {
    const recs = calculateRecommendations({
      realistic: 0, investigative: 0, artistic: 0,
      social: 0, enterprising: 0, conventional: 0,
    })
    expect(recs.length).toBe(courseRecommendations.length)
    // All should score 0 when all inputs are zero
    recs.forEach((r) => expect(r.matchScore).toBe(0))
  })
})

// ---------------------------------------------------------------------------
// getPersonalityArchetype
// ---------------------------------------------------------------------------
describe('getPersonalityArchetype', () => {
  it('returns an object with name, code, and summary', () => {
    const arch = getPersonalityArchetype({
      realistic: 20, investigative: 15, artistic: 5,
      social: 5, enterprising: 5, conventional: 5,
    })
    expect(arch).toHaveProperty('name')
    expect(arch).toHaveProperty('code')
    expect(arch).toHaveProperty('summary')
    expect(arch.name).toBeTypeOf('string')
    expect(arch.code).toBeTypeOf('string')
    expect(arch.summary).toBeTypeOf('string')
  })

  it('code reflects top two types', () => {
    const arch = getPersonalityArchetype({
      realistic: 5, investigative: 30, artistic: 25,
      social: 5, enterprising: 5, conventional: 5,
    })
    expect(arch.code).toBe('Investigative-Artistic')
  })

  it('provides a fallback for unknown combos', () => {
    // Even unusual combos should return a valid archetype
    const arch = getPersonalityArchetype({
      realistic: 0, investigative: 0, artistic: 0,
      social: 0, enterprising: 0, conventional: 0,
    })
    expect(arch.name.length).toBeGreaterThan(0)
    expect(arch.summary.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// inferCustomAnswerScores
// ---------------------------------------------------------------------------
describe('inferCustomAnswerScores', () => {
  it('returns empty object for personality category', () => {
    expect(inferCustomAnswerScores('I love coding', 'personality')).toEqual({})
  })

  it('returns empty object for empty string', () => {
    expect(inferCustomAnswerScores('', 'interest')).toEqual({})
  })

  it('matches tech keywords for interest category', () => {
    const scores = inferCustomAnswerScores('I enjoy coding apps', 'interest')
    expect(scores.investigative).toBeGreaterThan(0)
  })

  it('matches creative keywords for strength category', () => {
    const scores = inferCustomAnswerScores('I am good at creative writing', 'strength')
    expect(scores.artistic).toBeGreaterThan(0)
  })

  it('returns fallback scores when no keyword matches', () => {
    const scores = inferCustomAnswerScores('xyzzy gibberish', 'interest')
    // Fallback for interest: { investigative: 1, social: 1 }
    expect(scores.investigative).toBe(1)
    expect(scores.social).toBe(1)
  })

  it('returns fallback scores for strength with no match', () => {
    const scores = inferCustomAnswerScores('zzzzz unknown', 'strength')
    expect(scores.conventional).toBe(1)
    expect(scores.enterprising).toBe(1)
  })

  it('accumulates scores from multiple keyword matches', () => {
    // "business data" should match both business & data keyword sets for interest
    const scores = inferCustomAnswerScores('business data analysis', 'interest')
    expect(Object.values(scores).some((v) => v !== undefined && v > 0)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// getReadableLabel
// ---------------------------------------------------------------------------
describe('getReadableLabel', () => {
  it('maps known keys to readable labels', () => {
    expect(getReadableLabel('math_stats')).toBe('Math, statistics, or accounting')
    expect(getReadableLabel('bio_health')).toBe('Biology, chemistry, or health sciences')
    expect(getReadableLabel('creative_arts')).toBe('Art, design, music, film, or drama')
  })

  it('converts unknown values with underscore splitting + capitalize', () => {
    expect(getReadableLabel('some_unknown_value')).toBe('Some Unknown Value')
  })

  it('handles single-word values', () => {
    expect(getReadableLabel('hello')).toBe('Hello')
  })
})
