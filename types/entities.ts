/** ============================
 *  USER ENTITY
 *  ============================ */
export interface UserEntity {
  id: string
  name: string
  email: string

  // physical stats (can be null if user doesn't track them)
  weightKg?: number | null
  heightCm?: number | null
  bodyFatPercent?: number | null
  age?: number | null
  gender?: 'male' | 'female' | 'other' | null

  createdAt: string
  updatedAt: string
}

/** ============================
 *  EXERCISE ENTITY (LIBRARY)
 *  ============================ */
export interface ExerciseEntity {
  id: string
  name: string
  categoryId?: string
  description?: string
  muscleGroups?: string[]
  equipment?: string[]
  imageUrl?: string
  videoUrl?: string
  createdAt: string
  updatedAt: string
}

/** ============================
 *  SESSION-EXERCISE ENTITY
 *  ============================ */
export interface SessionExerciseEntity {
  id: string
  sessionId: string
  exerciseId: string
  createdAt: string
  updatedAt: string
}

/** ============================
 *  SET ENTITY
 *  ============================ */
export interface SetEntity {
  id: string
  sessionExerciseId: string
  weight: number | null
  reps: number
  order: number
}

/** ============================
 *  WORKOUT SESSION ENTITY
 *  ============================ */
export interface WorkoutSessionEntity {
  id: string
  name: string
  scheduledAt: string | null // ISO date (YYYY-MM-DD)
  order: number // vertical order inside that day
  createdAt: string
  updatedAt: string
}
