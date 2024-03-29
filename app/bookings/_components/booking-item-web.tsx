'use client'

import { Prisma } from '@prisma/client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../_components/ui/avatar'
import { Badge } from '../../_components/ui/badge'
import { Card, CardContent } from '../../_components/ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>

  click: () => void
}

const BookingItemWeb = ({ booking, click }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date)

  return (
    <Card
      className="min-w-full cursor-pointer hover:opacity-80"
      onClick={click}
    >
      <CardContent className="py-0 flex px-0">
        <div className="flex flex-col gap-2 py-5 md:py-3 flex-[3] pl-5 md:pl-3">
          <Badge
            variant={isBookingConfirmed ? 'default' : 'secondary'}
            className="w-fit"
          >
            {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
          <h2 className="font-bold md:text-base">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>MF</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
          <p className="text-sm capitalize">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, 'dd')}</p>
          <p className="text-sm">{format(booking.date, 'hh:mm')}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItemWeb
