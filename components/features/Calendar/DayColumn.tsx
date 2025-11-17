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
  onDropSession: (sessionId: string, targetDate: Date, targetOrder: number) => void
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
  const [targetOrder, setTargetOrder] = useState<number>(0)

  // Since i'm not sure if we can use react-query to handle server state, let's do it this way for now
  useEffect(() => {
    setLocalSessions([...sessions].sort((a, b) => a.order - b.order))
  }, [sessions])

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const reordered = [...localSessions]
    const [draggedItem] = reordered.splice(dragIndex, 1)
    if (draggedItem) {
      reordered.splice(hoverIndex, 0, draggedItem)
      setLocalSessions(reordered)
    }
  }

  const handleDrop = async (item: { session: WorkoutSessionSchema }) => {
    const isInSameDay = sessions.some((s) => s.id === item.session.id)

    if (isInSameDay) {
      // Update order for sessions in the same day
      localSessions.filter(Boolean).forEach((session, index) => {
        if (session && session.order !== index) {
          onReorderSession(session.id, index)
        }
      })
    } else {
      // Move session to new day with target order
      onDropSession(item.session.id, fullDate, targetOrder)
    }

    setTargetOrder(0)
  }

  const [{ isOver, draggedItem }, drop] = useDrop(
    () => ({
      accept: 'WORKOUT_SESSION',
      drop: handleDrop,
      hover: (item: { session: WorkoutSessionSchema; index: number }) => {
        const isFromThisDay = sessions.some((s) => s.id === item.session.id)
        if (!isFromThisDay) {
          // Default to end of list, but individual cards will override this
          setTargetOrder(localSessions.length)
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        draggedItem: monitor.getItem() as {
          session: WorkoutSessionSchema
          index: number
        } | null,
      }),
    }),
    [handleDrop, localSessions, sessions]
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
          {localSessions.filter(Boolean).map((session, index) => {
            const isFromThisDay = draggedItem
              ? sessions.some((s) => s.id === draggedItem.session.id)
              : true
            
            const showPlaceholderBefore = 
              draggedItem && 
              !isFromThisDay && 
              targetOrder === index

            return (
              <div key={session.id}>
                {showPlaceholderBefore && (
                  <div className="h-0.5 bg-primary rounded-full mb-[5px]" />
                )}
                <WorkoutSessionCard
                  workoutSession={session}
                  index={index}
                  onReorder={handleReorder}
                  onSetTargetOrder={setTargetOrder}
                  isFromThisDay={isFromThisDay}
                />
              </div>
            )
          })}
          {draggedItem && 
            !sessions.some((s) => s.id === draggedItem.session.id) &&
            targetOrder === localSessions.length && (
            <div className="h-0.5 bg-primary rounded-full" />
          )}
        </div>
      </div>
    </div>
  )
}

export default DayColumn