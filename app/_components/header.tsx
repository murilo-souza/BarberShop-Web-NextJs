'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { CalendarIcon, CircleUserRoundIcon, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './side-menu'
import Link from 'next/link'
import { Avatar, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'

interface HeaderProps {
  hiddenMobile?: string
}

const Header = ({ hiddenMobile = '' }: HeaderProps) => {
  const { data } = useSession()

  return (
    <header className={hiddenMobile}>
      <Card>
        <CardContent className="p-5 md:px-32 justify-between items-center flex flex-row">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
          </Link>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex md:flex-row md:items-center gap-6">
            <Button variant="ghost" asChild>
              <Link href="/bookings">
                <CalendarIcon size={18} className="md:mr-2" />
                Agendamentos
              </Link>
            </Button>
            {!data?.user ? (
              <Button variant="default">
                <CircleUserRoundIcon size={18} className="md:mr-2" />
                Perfil
              </Button>
            ) : (
              <Button variant="ghost" className="flex gap-2">
                <Avatar className="md:w-8 md:h-8">
                  <AvatarImage src={data.user.image ?? ''} />
                </Avatar>
                <p className="text-base font-bold">{data.user.name}</p>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
