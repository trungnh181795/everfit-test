import { ExerciseEntity } from '@/types/entities'
import { ExerciseSchema } from '@/types/schema'
import { STORAGE_FILES } from '@/config/storage.config'
import { storageService } from './storage.service'

/**
 * Exercise Service
 * Manages exercise-related operations.
 */

const getExerciseList = async (): Promise<ExerciseSchema[]> => {
  const exercises = await storageService.read<ExerciseEntity[]>(
    STORAGE_FILES.EXERCISES
  )

  return exercises.map(({ createdAt, updatedAt, ...exercise }) => exercise)
}

const getExerciseDetails = async (
  id: string
): Promise<ExerciseSchema | null> => {
  const exercises = await storageService.read<ExerciseEntity[]>(
    STORAGE_FILES.EXERCISES
  )

  const exercise = exercises.find((ex) => ex.id === id)

  if (!exercise) {
    return null
  }

  const { createdAt, updatedAt, ...exerciseSchema } = exercise
  return exerciseSchema
}

export const exerciseService = {
  getExerciseList,
  getExerciseDetails,
}
