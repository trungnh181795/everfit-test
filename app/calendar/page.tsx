import CalendarView from '@/components/features/Calendar/CalendarView'
import { workoutSessionService } from '@/services'

const CalendarPage = async () => {
  const sessions = await workoutSessionService.getAllWorkoutSessions()

  return (
    <div className="container mx-auto px-6 py-8 bg-white flex flex-1">
      <CalendarView initialSessions={sessions} />
    </div>
  )
}

export default CalendarPage

export const dynamic = 'force-dynamic'
