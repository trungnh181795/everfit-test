import { workoutSessionService } from '@/services/workoutSession.service'
import { NextResponse } from 'next/server'

/**
 * Workout Session API Routes
 * GET: Retrieve workout session data
 * POST: Create a new workout session
 * PUT: Update an existing workout session
 * DELETE: Delete a workout session
 */

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const session = await workoutSessionService.getWorkoutSessionDetails(id)

      if (!session) {
        return NextResponse.json(
          { error: 'Workout session not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(session)
    }

    const sessions = await workoutSessionService.getAllWorkoutSessions()
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching workout sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workout sessions' },
      { status: 500 }
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const newSession = await workoutSessionService.createWorkoutSession(body)
    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    console.error('Error creating workout session:', error)
    return NextResponse.json(
      { error: 'Failed to create workout session' },
      { status: 500 }
    )
  }
}

export const PUT = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const updatedSession = await workoutSessionService.updateWorkoutSession(
      id,
      body
    )

    if (!updatedSession) {
      return NextResponse.json(
        { error: 'Workout session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedSession)
  } catch (error) {
    console.error('Error updating workout session:', error)
    return NextResponse.json(
      { error: 'Failed to update workout session' },
      { status: 500 }
    )
  }
}

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const deleted = await workoutSessionService.deleteWorkoutSession(id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Workout session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting workout session:', error)
    return NextResponse.json(
      { error: 'Failed to delete workout session' },
      { status: 500 }
    )
  }
}
