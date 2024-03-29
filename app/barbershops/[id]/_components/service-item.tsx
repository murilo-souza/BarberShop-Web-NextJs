'use client'

import { Button } from '@/app/_components/ui/button'
import { Calendar } from '@/app/_components/ui/calendar'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet'
import { Barbershop, Booking, Service } from '@prisma/client'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { generateDayTimeList } from '../_helpers/hours'
import { addDays, format, setHours, setMinutes } from 'date-fns'
import { saveBooking } from '../_actions/save-booking'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getDaysBookings } from '../_actions/get-day-bookings'
import BookingInfo from '@/app/(home)/_components/booking-info'
import ScrollWrapper from '@/app/(home)/_components/scroll-wrapper'
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import DialogSignIn from '@/app/_components/dialog-signin'

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service
  isAuthenticated?: boolean
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (!date) {
      return
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDaysBookings(barbershop.id, date)
      setDayBookings(_dayBookings)
    }

    refreshAvailableHours()
  }, [barbershop.id, date])

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true)
    try {
      if (!date || !hour || !data?.user) {
        return
      }

      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })

      setSheetIsOpen(false)
      setHour(undefined)
      setDate(undefined)

      toast('Reserva realizada com sucesso!', {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: 'Visualizar',
          onClick: () => router.push('/bookings'),
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitIsLoading(false)
    }
  }

  const timeList = useMemo(() => {
    if (!date) {
      return []
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) {
        return true
      }

      return false
    })
  }, [date, dayBookings])

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              fill
              style={{ objectFit: 'contain' }}
              alt={service.name}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold md:text-sm">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(service.price)}
              </p>
              <Sheet
                open={!isAuthenticated ? false : sheetIsOpen}
                onOpenChange={setSheetIsOpen}
              >
                {isAuthenticated ? (
                  <SheetTrigger asChild>
                    <Button variant="secondary">Reservar</Button>
                  </SheetTrigger>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary">Reservar</Button>
                    </AlertDialogTrigger>
                    <DialogSignIn />
                  </AlertDialog>
                )}
                <SheetContent className="p-0 overflow-y-auto [&::-webkit-scrollbar]:hidden xl:pb-4 2xl:pb-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 md:hidden">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => handleDateClick(date)}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        cell: {
                          width: '100%',
                        },

                        button: {
                          width: '100%',
                        },

                        nav_button_next: {
                          width: '32px',
                          height: '32px',
                        },

                        nav_button_previous: {
                          width: '32px',
                          height: '32px',
                        },

                        caption: {
                          textTransform: 'capitalize',
                        },
                      }}
                    />
                  </div>
                  <div className="py-6 md:block hidden">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => handleDateClick(date)}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        table: {
                          width: 360,
                        },
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        cell: {
                          width: '100%',
                        },

                        button: {
                          width: '100%',
                        },

                        nav_button_next: {
                          width: '32px',
                          height: '32px',
                        },

                        nav_button_previous: {
                          width: '32px',
                          height: '32px',
                        },

                        caption: {
                          textTransform: 'capitalize',
                        },
                      }}
                    />
                  </div>
                  {date && (
                    <div className="border-t border-solid border-secondary">
                      <ScrollWrapper withMargin={false}>
                        <div className=" flex gap-3 [&::-webkit-scrollbar]:hidden py-6 px-5">
                          {timeList.map((time) => (
                            <Button
                              variant={hour === time ? 'default' : 'outline'}
                              className="rounded-full"
                              key={time}
                              onClick={() => handleHourClick(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </ScrollWrapper>
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <BookingInfo
                      booking={{
                        barbershop,
                        service,
                        date:
                          date && hour
                            ? setMinutes(
                                setHours(date, Number(hour.split(':')[0])),
                                Number(hour.split(':')[1]),
                              )
                            : undefined,
                      }}
                    />
                  </div>
                  <SheetFooter className="px-5">
                    <Button
                      disabled={!hour || !date || submitIsLoading}
                      onClick={handleBookingSubmit}
                      className="w-full"
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar reservar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
