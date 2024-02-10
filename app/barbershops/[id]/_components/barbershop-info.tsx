'use client'

import SideMenu from '@/app/_components/side-menu'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/app/_components/ui/sheet'
import { Barbershop } from '@prisma/client'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.replace('/')
  }

  return (
    <div>
      <div className="h-[250px] w-full relative md:hidden">
        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="z-50 absolute top-4 right-4"
            >
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{ objectFit: 'cover' }}
          className="opacity-75"
        />
      </div>

      <div className="md:mt-10">
        <div>
          <div className="hidden md:block md:pl-32">
            <Image
              src={barbershop.imageUrl}
              width={920}
              height={576}
              alt={barbershop.name}
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
            />
          </div>

          <div className="px-5 md:px-0 md:pl-32 pt-3 md:pt-5 pb-6 md:border-none border-b border-solid border-secondary md:flex md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-xl md:text-3xl font-bold ">
                {barbershop.name}
              </h1>
              <div className="flex items-center gap-1 mt-2 md:mt-3">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:hidden">
              <StarIcon className="text-primary" size={18} />
              <p className="text-sm">5,0 (20 avaliações)</p>
            </div>
            <Card className="border-none">
              <CardContent className="hidden md:flex md:flex-col items-center justify-items-center md:w-[135px] md:h-16 md:rounded-lg md:pt-1">
                <div className="flex items-center gap-1">
                  <StarIcon className="text-primary" size={18} />
                  <p className="text-xl">5,0</p>
                </div>
                <p className="text-xs mt-[5px]">889 avaliações</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopInfo
