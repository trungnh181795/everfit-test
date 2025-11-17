import { UserEntity } from '@/types/entities'
import { UserSchema, WorkoutSessionSchema } from '@/types/schema'
import { STORAGE_FILES } from '@/config/storage.config'
import { storageService } from './storage.service'

/**
 * User Service
 * Profile management and data retrieval operations.
 */

const getUserProfile = async (): Promise<UserSchema> => {
  const user = await storageService.read<UserEntity>(STORAGE_FILES.USER)

  const { createdAt, updatedAt, ...userSchema } = user
  return userSchema
}

const updateUserProfile = async (
  updates: Partial<Omit<UserSchema, 'id'>>
): Promise<UserSchema> => {
  const user = await storageService.read<UserEntity>(STORAGE_FILES.USER)

  const updatedUser: UserEntity = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  await storageService.write(STORAGE_FILES.USER, updatedUser)

  const { createdAt, updatedAt, ...userSchema } = updatedUser
  return userSchema
}

const getTodayWorkoutSessions = async (): Promise<WorkoutSessionSchema[]> => {
  const workoutSessions = await storageService.read<any[]>(
    STORAGE_FILES.WORKOUT_SESSIONS
  )
  const sessionExercises = await storageService.read<any[]>(
    STORAGE_FILES.SESSION_EXERCISES
  )
  const exercises = await storageService.read<any[]>(STORAGE_FILES.EXERCISES)
  const sets = await storageService.read<any[]>(STORAGE_FILES.SETS)

  const today = new Date().toISOString().split('T')[0]

  const todaySessions = workoutSessions.filter((session: any) => {
    if (!session.scheduledAt) return false
    return session.scheduledAt.split('T')[0] === today
  })

  return todaySessions.map((session: any) => {
    const sessionExerciseList = sessionExercises
      .filter((se: any) => se.sessionId === session.id)
      .map((se: any) => {
        const exercise = exercises.find((ex: any) => ex.id === se.exerciseId)
        const exerciseSets = sets.filter(
          (set: any) => set.sessionExerciseId === se.id
        )

        const { createdAt, updatedAt, ...exerciseSchema } = exercise

        return {
          id: se.id,
          exercise: exerciseSchema,
          sets: exerciseSets,
        }
      })

    return {
      id: session.id,
      name: session.name,
      scheduledAt: session.scheduledAt,
      order: session.order,
      sessionExercises: sessionExerciseList,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    }
  })
}

export const userService = {
  getUserProfile,
  updateUserProfile,
  getTodayWorkoutSessions,
}
