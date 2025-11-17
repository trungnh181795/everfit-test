import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { forwardRef, ComponentType, SVGProps } from 'react'

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'outline'
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      children,
      size = 'md',
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    }

    const iconSizes = {
      sm: 14,
      md: 16,
      lg: 20,
    }

    const variantClasses = {
      default: 'bg-primary text-white hover:bg-primary/90',
      ghost: 'hover:bg-gray-100 text-gray-600',
      outline: 'border border-gray-200 hover:bg-gray-100 text-gray-600',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'cursor-pointer inline-flex items-center justify-center rounded-full',
          'transition-colors focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {Icon && <Icon size={iconSizes[size]} />}
        {children}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton