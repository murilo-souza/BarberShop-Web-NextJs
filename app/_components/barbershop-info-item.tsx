import { Smartphone } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Barbershop } from '@prisma/client'
import { ReactNode } from 'react'

interface BarbershopInfoProps {
  barbershop: Barbershop
  children: ReactNode
}

const BarbershopInfoItem = ({ barbershop, children }: BarbershopInfoProps) => {
  return (
    <Card>
      <CardContent className="hidden md:block  md:w-96 p-5">
        <div className="relative h-[180px] w-full">
          <Image src="/barber_shop_bg.png" fill alt={barbershop.name} />

          <div className="w-full absolute bottom-4 left-0 px-5">
            <Card>
              <CardContent className="p-3 flex gap-2">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                  <AvatarFallback>MF</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="font-bold">{barbershop.name}</h2>
                  <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                    {barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-5 border-b border-solid border-secondary">
          <h3 className="font-bold text-sm uppercase mb-[10px]">Sobre nós</h3>
          <p className="font-normal text-sm text-gray-400 pb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            amet tenetur optio corrupti, quaerat ratione iste quibusdam, ducimus
            obcaecati, sequi ullam nostrum qui! Recusandae, architecto modi a
            qui suscipit nihil!
          </p>
        </div>

        <section>
          <div className="flex flex-row items-center justify-between pt-5">
            <div className="flex flex-row items-center gap-[10px]">
              <Smartphone />
              (11) 98204-5108
            </div>
            <Button variant="secondary">Copiar</Button>
          </div>
          <div className="flex flex-row items-center justify-between pt-5 border-b border-solid border-secondary pb-5">
            <div className="flex flex-row items-center gap-[10px]">
              <Smartphone />
              (11) 98204-5108
            </div>
            <Button variant="secondary">Copiar</Button>
          </div>
        </section>
        {children}
      </CardContent>
    </Card>
  )
}

export default BarbershopInfoItem
