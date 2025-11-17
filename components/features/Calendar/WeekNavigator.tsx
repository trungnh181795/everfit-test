import { ChevronLeft, ChevronRight } from 'lucide-react'
import IconButton from '@/components/ui/icon-button'

interface WeekNavigatorProps {
  currentMonth: string
  onPrevWeek: () => void
  onNextWeek: () => void
}

const WeekNavigator = ({
  currentMonth,
  onPrevWeek,
  onNextWeek,
}: WeekNavigatorProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <IconButton
        icon={ChevronLeft}
        variant="ghost"
        onClick={onPrevWeek}
        aria-label="Previous week"
      />
      <h2 className="text-xl font-semibold text-gray-900">
        {currentMonth}
      </h2>
      <IconButton
        icon={ChevronRight}
        variant="ghost"
        onClick={onNextWeek}
        aria-label="Next week"
      />
    </div>
  )
}

export default WeekNavigator
