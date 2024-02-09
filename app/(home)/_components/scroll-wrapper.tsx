'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode } from 'react'

interface ScrollWrapperProps {
  children: ReactNode
  boolean: boolean
}

const ScrollWrapper = ({ children }: ScrollWrapperProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  return (
    <div className="embla overflow-x-hidden md:ml-32" ref={emblaRef}>
      {children}
    </div>
  )
}

export default ScrollWrapper
