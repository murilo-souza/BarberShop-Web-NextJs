import { db } from '@/app/_lib/prisma'
import BarbershopInfo from './_components/barbershop-info'
import ServiceItem from './_components/service-item'
import { Service } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'
import BarbershopInfoItem from '@/app/_components/barbershop-info-item'
import Image from 'next/image'
import Header from '@/app/_components/header'

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },

    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return null
  }

  return (
    <>
      <Header hiddenMobile="hidden md:block" />

      <div className="md:grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <BarbershopInfo barbershop={barbershop} />

          <div className="px-5 flex flex-col gap-4 py-6 md:pl-32 md:px-0 md:grid md:grid-cols-2">
            {barbershop.services.map((service: Service) => (
              <ServiceItem
                key={service.id}
                service={service}
                isAuthenticated={!!session?.user}
                barbershop={barbershop}
              />
            ))}
          </div>
        </div>
        <div className="md:w-96 mt-10 md:col-span-1">
          <BarbershopInfoItem barbershop={barbershop}>
            <section className="md:pt-5 md:pb-5 md:border-b md:border-solid md:border-secondary">
              <div className="flex flex-row items-center justify-between pb-[10px] ">
                <span className="text-gray-400 text-sm">Segunda-Feira</span>
                <p className="text-sm">Fechado</p>
              </div>
              <div className="flex flex-row items-center justify-between pb-[10px]">
                <span className="text-gray-400 text-sm">Terça-Feira</span>
                <p className="text-sm">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row items-center justify-between pb-[10px]">
                <span className="text-gray-400 text-sm">Quarta-Feira</span>
                <p className="text-sm">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row items-center justify-between pb-[10px]">
                <span className="text-gray-400 text-sm">Quinta-Feira</span>
                <p className="text-sm">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row items-center justify-between pb-[10px]">
                <span className="text-gray-400 text-sm">Sexta-Feira</span>
                <p className="text-sm">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row items-center justify-between pb-[10px]">
                <span className="text-gray-400 text-sm">Sábado</span>
                <p className="text-sm">08:00 - 21:00</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-gray-400 text-sm">Domingo</span>
                <p className="text-sm">Fechado</p>
              </div>
            </section>

            <section>
              <div className="flex flex-row items-center justify-between pt-[41.5px]">
                <span className="text-sm">Em parceria com</span>
                <Image
                  src="/logo.png"
                  alt="FSW Barber"
                  height={18}
                  width={120}
                />
              </div>
            </section>
          </BarbershopInfoItem>
        </div>
      </div>
    </>
  )
}

export default BarbershopDetailsPage
