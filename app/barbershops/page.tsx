import { Barbershop } from '@prisma/client'
import BabershopItem from '../(home)/_components/babershop-item'
import Header from '../_components/header'
import { db } from '../_lib/prisma'
import { redirect } from 'next/navigation'

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) {
    return redirect('/')
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultado para &quot;{searchParams.search}&quot;
        </h1>
        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BabershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
