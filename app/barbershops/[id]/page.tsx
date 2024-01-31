import { db } from '@/app/_lib/prisma'

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!barbershop) {
    return null
  }

  return <h1>{barbershop.name}</h1>
}

export default BarbershopDetailsPage
