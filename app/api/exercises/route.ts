import { exerciseService } from '@/services/exercise.service'
import { NextResponse } from 'next/server'

/**
 * Exercise API Route
 * GET: Retrieve exercise data
 */

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const exercise = await exerciseService.getExerciseDetails(id)

      if (!exercise) {
        return NextResponse.json(
          { error: 'Exercise not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(exercise)
    }

    const exercises = await exerciseService.getExerciseList()
    return NextResponse.json(exercises)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    )
  }
}
