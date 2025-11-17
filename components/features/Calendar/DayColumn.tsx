import { WorkoutSessionSchema } from '@/types/schema'
import { cn } from '@/lib/utils'
import { useDrop } from 'react-dnd'
import { useState, useEffect } from 'react'
import WorkoutSessionCard from '../WorkoutSessions/WorkoutSessionCard'
import AddIcon from '@/components/common/AddIcon'

/**
 * DayColumn component represents a single day column in the calendar view.
 * Props:
 * sessions: WorkoutSessionSchema[]
 * some props showing the Mon, Tue, Wed... at the top center of the column
 * below 9px is a #F3F5F8 background 6px radius flex column gap 4px
 * header show the date number in 600 weight + size 11px #728096 color, align to left, px 9px
 * below is the body: a vertical list of WorkoutSessionCard components with gap 5px in y-axis, px 7px
 */

interface DayColumnProps {
  dayName: string
  date: number
  sessions: WorkoutSessionSchema[]
  isToday?: boolean
  className?: string
  onDropSession: (sessionId: string, targetDate: Date) => void
  onReorderSession: (sessionId: string, newOrder: number) => void
  fullDate: Date
}

const DayColumn = ({
  dayName,
  date,
  sessions,
  isToday = false,
  className,
  onDropSession,
  onReorderSession,
  fullDate,
}: DayColumnProps) => {
  const [localSessions, setLocalSessions] = useState<WorkoutSessionSchema[]>(
    []
  )

  useEffect(() => {
    setLocalSessions([...sessions].sort((a, b) => a.order - b.order))
  }, [sessions])

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const reordered = [...localSessions]
    const [draggedItem] = reordered.splice(dragIndex, 1)
    reordered.splice(hoverIndex, 0, draggedItem)
    setLocalSessions(reordered)
  }

  const handleDrop = async (item: { session: WorkoutSessionSchema }) => {
    const isInSameDay = sessions.some((s) => s.id === item.session.id)
    
    if (isInSameDay) {
      // Update order for each session
      for (const [index, session] of localSessions.entries()) {
        if (session.order !== index) {
          try {
            await fetch(`/api/workout-sessions?id=${session.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ order: index }),
            })
          } catch (error) {
            console.error('Failed to update session order:', error)
          }
        }
      }
      // Revalidate
      window.location.reload()
    } else {
      onDropSession(item.session.id, fullDate)
    }
  }

  const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: 'WORKOUT_SESSION',
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        draggedItem: monitor.getItem() as { session: WorkoutSessionSchema; index: number } | null,
      }),
    }),
    [handleDrop, localSessions, fullDate]
  )

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Day Name Header */}
      <div
        className={cn(
          'text-center text-xs font-medium shrink-0',
          isToday ? 'text-primary font-bold' : 'text-gray-600'
        )}
      >
        {dayName}
      </div>

      {/* Day Content Container */}
      <div
        ref={drop as any}
        className={cn(
          'mt-[9px] bg-gray-100 rounded-md flex flex-col gap-1 flex-1',
          isOver && 'bg-gray-200'
        )}
      >
        {/* Date Header */}
        <div className="px-[9px] pt-2 flex justify-between items-center shrink-0">
          <span
            className={cn(
              'text-[11px] font-semibold text-gray-600',
              isToday && 'text-primary font-bold'
            )}
          >
            {date}
          </span>
           <AddIcon />
        </div>

        {/* Sessions Body */}
        <div className="px-[7px] pb-2 flex flex-col gap-[5px] flex-1">
          {localSessions.map((session, index) => (
            <WorkoutSessionCard
              key={session.id}
              workoutSession={session}
              index={index}
              onReorder={handleReorder}
            />
          ))}
          {isOver && draggedItem && !sessions.some((s) => s.id === draggedItem.session.id) && (
            <div className="bg-white/40 border-2 border-dashed border-primary/50 rounded-md h-20 flex items-center justify-center">
              <span className="text-xs text-gray-400">Drop here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DayColumn