import PlusIcon from '@/components/icons/Plus'
import { cn } from '@/lib/utils'
import { IconButton } from '../ui'

/**
 * AddIcon
 * A simple plus icon component.
 * Fully rounded
 * background #A0A8B1, 12x12px size, white plus icon centered
 */

interface AddIconProps {
  className?: string
}

const AddIcon = ({ className }: AddIconProps) => {
  return (
    <IconButton
      className={cn(
        'h-3 w-3 rounded-full bg-secondary flex items-center justify-center',
        className
      )}
    >
      <PlusIcon size={6} className="text-white" />
    </IconButton>
  )
}

export default AddIcon
