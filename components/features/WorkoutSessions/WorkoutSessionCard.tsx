import { WorkoutSessionSchema } from '@/types/schema'
import { cn } from '@/lib/utils'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import IconButton from '@/components/ui/icon-button'
import AddIcon from '@/components/common/AddIcon'
import { EllipsisIcon } from '@/components/icons'
import ExerciseCard from '../Exercises/ExerciseCard'

/**
 * WorkoutSessionCard
 * Props:
 * - workoutSession: WorkoutSessionSchema
 * - forwarded className
 * - A white/80% background + line color bordered + 6px rounded card to show workout session information py-5px. flex column gap 5px
 * - header contains the workout session uppercased name and an elipses icon button on the right (justify between). The name is weight 700 + size 10px + primary color, which will be truncated with ellipsis if too long (the max width is the remaining space after the icon button took place with 6px gap ). px 6px
 * - below is the body: contain list of exercise cards (ExerciseCard component) with gap 4px in y-axis. body px-3px
 * - the footer is a icon button (with plus icon)
 */

interface WorkoutSessionCardProps {
  workoutSession: WorkoutSessionSchema
  className?: string
  index?: number
  onReorder?: (dragIndex: number, hoverIndex: number) => void
  onSetTargetOrder?: (order: number) => void
  isFromThisDay?: boolean
}

const WorkoutSessionCard = ({
  workoutSession,
  className,
  index,
  onReorder,
  onSetTargetOrder,
  isFromThisDay = true,
}: WorkoutSessionCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'WORKOUT_SESSION',
      item: { session: workoutSession, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [workoutSession, index]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'WORKOUT_SESSION',
      hover: (
        item: { session: WorkoutSessionSchema; index: number },
        monitor
      ) => {
        if (!ref.current || index === undefined) {
          return
        }

        // Check if the dragged item is from a different day
        const isDifferentDay = !isFromThisDay && item.session.id !== workoutSession.id
        
        if (isDifferentDay && onSetTargetOrder) {
          // For cross-day drops, set the target order to this card's index
          onSetTargetOrder(index)
        } else if (onReorder && isFromThisDay) {
          // For same-day reordering, use the existing logic
          const dragIndex = item.index
          const hoverIndex = index

          if (dragIndex === hoverIndex) {
            return
          }

          const hoverBoundingRect = ref.current.getBoundingClientRect()
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()

          if (!clientOffset) {
            return
          }

          const hoverClientY = clientOffset.y - hoverBoundingRect.top

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }

          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }

          onReorder(dragIndex, hoverIndex)
          item.index = hoverIndex
        }
      },
    }),
    [index, onReorder, onSetTargetOrder, isFromThisDay, workoutSession.id]
  )

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={cn(
        'bg-white/80 border border-gray-200 rounded-md py-[5px]',
        'flex flex-col gap-[5px]',
        isDragging && 'opacity-50 cursor-grabbing',
        !isDragging && 'cursor-grab',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-1.5 px-1.5">
        <h3 className="text-[10px] font-bold text-primary uppercase truncate flex-1">
          {workoutSession.name}
        </h3>
        <IconButton
          icon={EllipsisIcon}
          size="sm"
          variant="ghost"
          aria-label="Options"
          className="hover:text-primary"
        />
      </div>

      {/* Body - Exercise List */}
      <div className="flex flex-col gap-1 px-[3px]">
        {workoutSession.sessionExercises.map((sessionExercise) => (
          <ExerciseCard
            key={sessionExercise.id}
            sessionExercise={sessionExercise}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end px-1.5">
        <AddIcon />
      </div>
    </div>
  )
}

export default WorkoutSessionCard
