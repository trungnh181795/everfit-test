import { SessionExerciseSchema } from '@/types/schema'
import { cn } from '@/lib/utils'

/**
 * ExerciseCard
 * Props:
 * - exercise: ExerciseSchema
 * - forwarded className
 * - A white background + line color bordered + 3px rounded card to show exercise information (px 4, py-[5px])
 * - title fond 600 weight + 13px size + aligned to the right, black
 * - below 1px is title show flex box between: set + "x" on the left, and (set + unit) x reps (#919CAD 10px), aligned to the right, joined with ", " as multiple sets (#95A6B7 10px)
 * - the card should be elevated with shadow: box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
 */

interface ExerciseCardProps {
  sessionExercise: SessionExerciseSchema
  className?: string
}

const ExerciseCard = ({ sessionExercise, className }: ExerciseCardProps) => {
  const { exercise, sets } = sessionExercise

  const sortedSets = [...sets].sort((a, b) => a.order - b.order)
  const setCount = sortedSets.length

  const setDetails = sortedSets
    .map((set) => {
      const weight = set.weight ? `${set.weight} lb` : 'BW'
      return `${weight} x ${set.reps}`
    })
    .join(', ')

  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-[3px] px-[3px] py-[5px]',
        'shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]',
        className
      )}
    >
      <div className="text-[13px] font-semibold text-black text-right truncate">
        {exercise.name}
      </div>
      {setCount > 0 && (
        <div className="mt-px flex items-center justify-between gap-4">
          <span className="text-[10px] text-gray-400 shrink-0">
            {setCount}x
          </span>
          <span className="text-[10px] text-gray-500 text-right truncate">
            {setDetails}
          </span>
        </div>
      )}
    </div>
  )
}

export default ExerciseCard
