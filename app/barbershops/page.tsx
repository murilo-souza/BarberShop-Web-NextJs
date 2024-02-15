import { Barbershop } from '@prisma/client'
import BabershopItem from '../(home)/_components/babershop-item'
import Header from '../_components/header'
import { db } from '../_lib/prisma'
import { redirect } from 'next/navigation'
import Search from '../(home)/_components/search'

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

      <div className="px-5 md:px-32 py-6 flex flex-col gap-6">
        <Search defaultValue={{ search: searchParams.search }} />
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultado para &quot;{searchParams.search}&quot;
        </h1>
        <div className="grid grid-cols-2 mt-3 md:mt-0 gap-4 md:grid-cols-6">
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
