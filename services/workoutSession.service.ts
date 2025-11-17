import {
  WorkoutSessionEntity,
  SessionExerciseEntity,
  SetEntity,
  ExerciseEntity,
} from '@/types/entities'
import { WorkoutSessionSchema } from '@/types/schema'
import { STORAGE_FILES } from '@/config/storage.config'
import { storageService } from './storage.service'

/**
 * Workout Session Service
 * Handles operations related to workout sessions.
 */

const getAllWorkoutSessions = async (): Promise<WorkoutSessionSchema[]> => {
  const workoutSessions = await storageService.read<WorkoutSessionEntity[]>(
    STORAGE_FILES.WORKOUT_SESSIONS
  )
  const sessionExercises = await storageService.read<SessionExerciseEntity[]>(
    STORAGE_FILES.SESSION_EXERCISES
  )
  const exercises = await storageService.read<ExerciseEntity[]>(
    STORAGE_FILES.EXERCISES
  )
  const sets = await storageService.read<SetEntity[]>(STORAGE_FILES.SETS)

  return workoutSessions.map((session) => {
    const sessionExerciseList = sessionExercises
      .filter((se) => se.sessionId === session.id)
      .map((se) => {
        const exercise = exercises.find((ex) => ex.id === se.exerciseId)
        const exerciseSets = sets.filter(
          (set) => set.sessionExerciseId === se.id
        )

        if (!exercise) {
          throw new Error(`Exercise not found: ${se.exerciseId}`)
        }

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

const getWorkoutSessionDetails = async (
  id: string
): Promise<WorkoutSessionSchema | null> => {
  const sessions = await getAllWorkoutSessions()
  return sessions.find((session) => session.id === id) || null
}

const createWorkoutSession = async (
  data: Omit<WorkoutSessionSchema, 'id' | 'createdAt' | 'updatedAt'>
): Promise<WorkoutSessionSchema> => {
  const workoutSessions = await storageService.read<WorkoutSessionEntity[]>(
    STORAGE_FILES.WORKOUT_SESSIONS
  )
  const sessionExercises = await storageService.read<SessionExerciseEntity[]>(
    STORAGE_FILES.SESSION_EXERCISES
  )
  const sets = await storageService.read<SetEntity[]>(STORAGE_FILES.SETS)

  const newSessionId = `session-${Date.now()}`
  const now = new Date().toISOString()

  const newSession: WorkoutSessionEntity = {
    id: newSessionId,
    name: data.name,
    scheduledAt: data.scheduledAt,
    order: data.order,
    createdAt: now,
    updatedAt: now,
  }

  workoutSessions.push(newSession)

  const newSessionExercises: SessionExerciseEntity[] = []
  const newSets: SetEntity[] = []

  data.sessionExercises.forEach((se) => {
    const sessionExerciseId = `se-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    newSessionExercises.push({
      id: sessionExerciseId,
      sessionId: newSessionId,
      exerciseId: se.exercise.id,
      createdAt: now,
      updatedAt: now,
    })

    se.sets.forEach((set) => {
      newSets.push({
        id: `set-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sessionExerciseId: sessionExerciseId,
        weight: set.weight,
        reps: set.reps,
        order: set.order,
      })
    })
  })

  sessionExercises.push(...newSessionExercises)
  sets.push(...newSets)

  await storageService.write(STORAGE_FILES.WORKOUT_SESSIONS, workoutSessions)
  await storageService.write(STORAGE_FILES.SESSION_EXERCISES, sessionExercises)
  await storageService.write(STORAGE_FILES.SETS, sets)

  return {
    id: newSession.id,
    name: newSession.name,
    scheduledAt: newSession.scheduledAt,
    order: newSession.order,
    sessionExercises: data.sessionExercises,
    createdAt: newSession.createdAt,
    updatedAt: newSession.updatedAt,
  }
}

const updateWorkoutSession = async (
  id: string,
  data: Partial<Omit<WorkoutSessionSchema, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<WorkoutSessionSchema | null> => {
  const workoutSessions = await storageService.read<WorkoutSessionEntity[]>(
    STORAGE_FILES.WORKOUT_SESSIONS
  )
  let sessionExercises = await storageService.read<SessionExerciseEntity[]>(
    STORAGE_FILES.SESSION_EXERCISES
  )
  let sets = await storageService.read<SetEntity[]>(STORAGE_FILES.SETS)

  const sessionIndex = workoutSessions.findIndex((session) => session.id === id)

  if (sessionIndex === -1) {
    return null
  }

  const now = new Date().toISOString()

  workoutSessions[sessionIndex] = {
    ...workoutSessions[sessionIndex],
    name: data.name ?? workoutSessions[sessionIndex].name,
    scheduledAt:
      data.scheduledAt !== undefined
        ? data.scheduledAt
        : workoutSessions[sessionIndex].scheduledAt,
    order: data.order ?? workoutSessions[sessionIndex].order,
    updatedAt: now,
  }

  if (data.sessionExercises) {
    sessionExercises = sessionExercises.filter((se) => se.sessionId !== id)
    sets = sets.filter((set) => {
      const se = sessionExercises.find((s) => s.id === set.sessionExerciseId)
      return !se || se.sessionId !== id
    })

    const newSessionExercises: SessionExerciseEntity[] = []
    const newSets: SetEntity[] = []

    data.sessionExercises.forEach((se) => {
      const sessionExerciseId =
        se.id || `se-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      newSessionExercises.push({
        id: sessionExerciseId,
        sessionId: id,
        exerciseId: se.exercise.id,
        createdAt: now,
        updatedAt: now,
      })

      se.sets.forEach((set) => {
        newSets.push({
          id:
            set.id ||
            `set-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          sessionExerciseId: sessionExerciseId,
          weight: set.weight,
          reps: set.reps,
          order: set.order,
        })
      })
    })

    sessionExercises.push(...newSessionExercises)
    sets.push(...newSets)
  }

  await storageService.write(STORAGE_FILES.WORKOUT_SESSIONS, workoutSessions)
  await storageService.write(STORAGE_FILES.SESSION_EXERCISES, sessionExercises)
  await storageService.write(STORAGE_FILES.SETS, sets)

  return getWorkoutSessionDetails(id)
}

const deleteWorkoutSession = async (id: string): Promise<boolean> => {
  let workoutSessions = await storageService.read<WorkoutSessionEntity[]>(
    STORAGE_FILES.WORKOUT_SESSIONS
  )
  let sessionExercises = await storageService.read<SessionExerciseEntity[]>(
    STORAGE_FILES.SESSION_EXERCISES
  )
  let sets = await storageService.read<SetEntity[]>(STORAGE_FILES.SETS)

  const sessionExists = workoutSessions.some((session) => session.id === id)

  if (!sessionExists) {
    return false
  }

  const sessionExerciseIds = sessionExercises
    .filter((se) => se.sessionId === id)
    .map((se) => se.id)

  sets = sets.filter(
    (set) => !sessionExerciseIds.includes(set.sessionExerciseId)
  )
  sessionExercises = sessionExercises.filter((se) => se.sessionId !== id)
  workoutSessions = workoutSessions.filter((session) => session.id !== id)

  await storageService.write(STORAGE_FILES.WORKOUT_SESSIONS, workoutSessions)
  await storageService.write(STORAGE_FILES.SESSION_EXERCISES, sessionExercises)
  await storageService.write(STORAGE_FILES.SETS, sets)

  return true
}

export const workoutSessionService = {
  getAllWorkoutSessions,
  getWorkoutSessionDetails,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession,
}
