'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode } from 'react'

interface ScrollWrapperProps {
  children: ReactNode
  withMargin?: boolean
}

const ScrollWrapper = ({ children, withMargin = true }: ScrollWrapperProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  return (
    <div
      className={
        withMargin
          ? 'embla overflow-x-hidden md:ml-32 md: mr-32'
          : 'embla overflow-x-hidden'
      }
      ref={emblaRef}
    >
      {children}
    </div>
  )
}

export default ScrollWrapper
