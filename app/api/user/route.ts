import { userService } from '@/services/user.service'
import { NextResponse } from 'next/server'

/**
 * User API Routes
 * GET: Retrieve user profile data
 * PUT: Update user profile data
 */

export const GET = async () => {
  try {
    const user = await userService.getUserProfile()
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

export const PUT = async (request: Request) => {
  try {
    const body = await request.json()
    const updatedUser = await userService.updateUserProfile(body)
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}
