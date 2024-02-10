import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import Search from './_components/search'
import BookingItem from '../_components/booking-item'
import { db } from '../_lib/prisma'
import BabershopItem from './_components/babershop-item'
import { Barbershop, Booking } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import ScrollWrapper from './_components/scroll-wrapper'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recomendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: 'asc',
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : [],
    ])
  return (
    <div>
      <Header />
      <div className="md:flex md:flex-row md:items-center md:pt-[65px] md:pb-16 md:bg-blur md:bg-cover md:bg-no-repeat">
        <div>
          <div className="px-5 pt-5 md:px-32">
            <h2 className="text-xl font-bold">
              {session?.user
                ? `Olá, ${session.user.name?.split(' ')[0]}`
                : 'Olá! vamos agendar um corte de cabelo hoje?'}
            </h2>
            <p className="capitalize text-sm">
              {format(new Date(), "EEEE',' dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="md:min-w-[700px]">
            <div className="px-5 mt-6 md:mt-[46px] md:px-32">
              <Search />
            </div>

            <div className="mt-6 md:mt-[46px]">
              {confirmedBookings.length > 0 && (
                <>
                  <h2 className=" pl-5 md:pl-32 text-xs mb-3 md:mb-5 md:text-sm uppercase text-gray-400 font-bold">
                    Agendamentos
                  </h2>

                  <div className="px-5 md:px-32 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden md:hidden">
                    {confirmedBookings.map((booking: Booking) => (
                      <BookingItem key={booking.id} booking={booking} />
                    ))}
                  </div>
                  <div className="px-5 md:px-32 md:flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden hidden">
                    <BookingItem booking={confirmedBookings[0]} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <h2 className="md:px-0 md:text-sm md:mb-5 md:uppercase md:text-gray-400 md:font-bold">
            Mais Vistos
          </h2>
          <ScrollWrapper withMargin={false}>
            <div className="md:flex md:px-0 md:gap-5 md:[&::-webkit-scrollbar]:hidden md:max-w-[750px] ">
              {barbershops.map((barbershop: Barbershop) => (
                <div
                  key={barbershop.id}
                  className="md:min-w-[220px] md:max-w-[220px]"
                >
                  <BabershopItem barbershop={barbershop} />
                </div>
              ))}
            </div>
          </ScrollWrapper>
        </div>
      </div>

      <div className="mt-6 md:mt-10">
        <h2 className="px-5 md:px-32 text-xs md:text-xl mb-3 md:mb-5 uppercase md:capitalize text-gray-400 md:text-white font-bold">
          Recomentados
        </h2>
        <ScrollWrapper>
          <div className="flex px-5 md:px-0 gap-2 md:gap-5 [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop: Barbershop) => (
              <div
                key={barbershop.id}
                className="min-w-[167px] max-w-[167px] md:min-w-[220px] md:max-w-[220px]"
              >
                <BabershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </ScrollWrapper>
      </div>

      <div className="mt-6 mb-[4.5rem] md:mt-10">
        <h2 className="px-5 md:px-32 text-xs md:text-xl mb-3 md:mb-5 uppercase md:capitalize text-gray-400 md:text-white font-bold">
          Populares
        </h2>
        <ScrollWrapper>
          <div className="flex px-5 md:px-0 gap-2 md:gap-5  [&::-webkit-scrollbar]:hidden">
            {recomendedBarbershops.map((barbershop: Barbershop) => (
              <div
                key={barbershop.id}
                className="min-w-[167px] max-w-[167px] md:min-w-[220px] md:max-w-[220px]"
              >
                <BabershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </ScrollWrapper>
      </div>
    </div>
  )
}
