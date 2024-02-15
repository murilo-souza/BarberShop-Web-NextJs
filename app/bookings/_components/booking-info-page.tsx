'use client'

import BookingInfo from '@/app/(home)/_components/booking-info'
import { cancelBooking } from '@/app/_actions/cancel-booking'
import BarbershopInfoItem from '@/app/_components/barbershop-info-item'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Booking, Prisma } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import BookingItemWeb from './booking-item-web'
import { isFuture } from 'date-fns'

interface BookingInfoPageProps {
  confirmedBookings: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>[]
  finishedBookings: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>[]
}

const BookingInfoPage = ({
  confirmedBookings,
  finishedBookings,
}: BookingInfoPageProps) => {
  const [bookingSelected, setBookingSelected] =
    useState<Prisma.BookingGetPayload<{
      include: {
        service: true
        barbershop: true
      }
    }> | null>(null)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = bookingSelected && isFuture(bookingSelected.date)

  const handleBookingDetails = (
    booking: Prisma.BookingGetPayload<{
      include: {
        service: true
        barbershop: true
      }
    }>,
  ) => {
    setBookingSelected(booking)
  }

  const handleCancelBooking = async (booking: Booking) => {
    setIsDeleteLoading(true)

    try {
      await cancelBooking(booking.id)

      toast.success('Reserva cancelada com sucesso!')
    } catch (err) {
      console.log(err)
    } finally {
      setIsDeleteLoading(false)
      setBookingSelected(null)
    }
  }

  return (
    <div className="hidden md:px-80 md:grid md:grid-cols-2 md:items-start gap-10 mb-[100px] mt-10">
      <div className="md:col-span-1">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
              Confirmados
            </h2>
            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking: Booking) => (
                <BookingItemWeb
                  key={booking.id}
                  click={() => handleBookingDetails(booking)}
                  booking={booking}
                />
              ))}
            </div>
          </>
        )}
        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
              Finalizados
            </h2>
            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking: Booking) => (
                <BookingItemWeb
                  key={booking.id}
                  click={() => handleBookingDetails(booking)}
                  booking={booking}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {bookingSelected && (
        <div className="md:w-96 mt-[85px] md:col-span-1">
          <BarbershopInfoItem
            key={bookingSelected.id}
            barbershop={bookingSelected.barbershop}
          >
            <div>
              <Badge
                variant={isBookingConfirmed ? 'default' : 'secondary'}
                className="w-fit my-3"
              >
                {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>

              <BookingInfo booking={bookingSelected} />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {isBookingConfirmed && (
                    <Button className="w-full mt-5" variant="destructive">
                      Cancelar Reserva
                    </Button>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%] rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deseja mesmo cancelar essa reserva?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Uma vez cancelada, não poderá reverter essa ação.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogCancel className="w-full mt-0">
                      Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={isDeleteLoading}
                      className="w-full"
                      onClick={() => handleCancelBooking(bookingSelected)}
                    >
                      Cancelar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </BarbershopInfoItem>
        </div>
      )}
    </div>
  )
}

export default BookingInfoPage
