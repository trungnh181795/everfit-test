import { forwardRef } from 'react'

interface EllipsisIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

const EllipsisIcon = forwardRef<SVGSVGElement, EllipsisIconProps>(
  ({ size = 11, ...props }, ref) => {
    const height = Math.ceil((size * 3) / 11)
    return (
      <svg
        ref={ref}
        width={size}
        height={height}
        viewBox="0 0 11 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
        {...props}
      >
        <ellipse
          cx="1.5"
          cy="1.47981"
          rx="1.5"
          ry="1.47981"
          fill="currentColor"
        />
        <ellipse
          cx="5.5"
          cy="1.47981"
          rx="1.5"
          ry="1.47981"
          fill="currentColor"
        />
        <ellipse
          cx="9.5"
          cy="1.47981"
          rx="1.5"
          ry="1.47981"
          fill="currentColor"
        />
      </svg>
    )
  }
)

EllipsisIcon.displayName = 'EllipsisIcon'

export default EllipsisIcon
