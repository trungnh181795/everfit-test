export interface UserSchema {
  id: string
  name: string
  email: string

  weightKg?: number | null
  heightCm?: number | null
  bodyFatPercent?: number | null
  age?: number | null
  gender?: 'male' | 'female' | 'other' | null
}

export interface ExerciseSchema {
  id: string
  name: string
  categoryId?: string
  description?: string
  muscleGroups?: string[]
  equipment?: string[]
  imageUrl?: string
  videoUrl?: string
}

export interface SetSchema {
  id: string
  weight: number | null
  reps: number
  order: number
}

export interface SessionExerciseSchema {
  id: string
  exercise: ExerciseSchema
  sets: SetSchema[]
}

export interface WorkoutSessionSchema {
  id: string
  name: string
  scheduledAt: string | null
  order: number

  sessionExercises: SessionExerciseSchema[]

  createdAt: string
  updatedAt: string
}
