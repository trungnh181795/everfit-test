import { forwardRef } from 'react'

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

const PlusIcon = forwardRef<SVGSVGElement, PlusIconProps>(
  ({ size = 6, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 1.97308V0H2V1.97308H0V3.94616H2V5.91925H4V3.94616H6V1.97308H4Z"
          fill="currentColor"
        />
      </svg>
    )
  }
)

PlusIcon.displayName = 'PlusIcon'

export default PlusIcon
