'use server'

import { db } from '@/app/_lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

export const getDaysBookings = async (date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
