'use client'

import { useState, useMemo } from 'react'
import { WorkoutSessionSchema } from '@/types/schema'
import DayColumn from './DayColumn'
import WeekNavigator from './WeekNavigator'

interface CalendarViewProps {
  initialSessions: WorkoutSessionSchema[]
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CalendarView = ({ initialSessions }: CalendarViewProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = day === 0 ? -6 : 1 - day
    const monday = new Date(today)
    monday.setDate(today.getDate() + diff)
    monday.setHours(0, 0, 0, 0)
    return monday
  })

  const [workoutSessions, setWorkoutSessions] =
    useState<WorkoutSessionSchema[]>(initialSessions)

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      return date
    })
  }, [currentWeekStart])

  const currentMonth = useMemo(() => {
    const firstDay = weekDates[0]
    const lastDay = weekDates[6]

    if (firstDay.getMonth() === lastDay.getMonth()) {
      return firstDay.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    }

    return `${firstDay.toLocaleDateString('en-US', { month: 'long' })} - ${lastDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
  }, [weekDates])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sessionsByDate = useMemo(() => {
    const grouped: { [key: string]: WorkoutSessionSchema[] } = {}

    workoutSessions.forEach((session) => {
      if (!session.scheduledAt) return

      const sessionDate = new Date(session.scheduledAt)
      sessionDate.setHours(0, 0, 0, 0)
      const dateKey = sessionDate.toISOString().split('T')[0]

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(session)
    })

    return grouped
  }, [workoutSessions])

  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() - 7)
      return newDate
    })
  }

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + 7)
      return newDate
    })
  }

  const handleDropSession = (
    sessionId: string,
    targetDate: Date,
    targetOrder: number
  ) => {
    setWorkoutSessions((prevSessions) => {
      return prevSessions.map((session) => {
        if (session.id === sessionId) {
          const newScheduledAt = new Date(targetDate)
          newScheduledAt.setHours(12, 0, 0, 0)
          return {
            ...session,
            scheduledAt: newScheduledAt.toISOString(),
            order: targetOrder,
          }
        }
        return session
      })
    })
  }

  const handleReorderSession = (sessionId: string, newOrder: number) => {
    setWorkoutSessions((prevSessions) => {
      return prevSessions.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            order: newOrder,
          }
        }
        return session
      })
    })
  }

  return (
    <div className="w-full min-h-full flex flex-col gap-3">
      <div className="w-full shrink-0">
        <WeekNavigator
          currentMonth={currentMonth}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />
      </div>

      <div className="grid grid-cols-7 gap-2.5 items-stretch flex-1">
        {weekDates.map((date, index) => {
          const dateKey = date.toISOString().split('T')[0]
          const sessions = sessionsByDate[dateKey] || []
          const isToday = date.getTime() === today.getTime()

          return (
            <DayColumn
              key={dateKey}
              dayName={DAYS[index]}
              date={date.getDate()}
              sessions={sessions}
              isToday={isToday}
              fullDate={date}
              onDropSession={handleDropSession}
              onReorderSession={handleReorderSession}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView
