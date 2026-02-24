import { NextRequest, NextResponse } from 'next/server'
import { calculateRecommendations } from '@/lib/career-data'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scores } = body

    if (!scores) {
      return NextResponse.json({ error: 'Missing scores' }, { status: 400 })
    }

    const recommendations = calculateRecommendations(scores)
    return NextResponse.json(recommendations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate recommendations' }, { status: 500 })
  }
}
