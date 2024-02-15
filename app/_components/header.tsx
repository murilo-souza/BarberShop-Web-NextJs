'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import {
  CalendarIcon,
  CircleUserRoundIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserCircleIcon,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './side-menu'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import DialogSignIn from './dialog-signin'

interface HeaderProps {
  hiddenMobile?: string
}

const Header = ({ hiddenMobile = '' }: HeaderProps) => {
  const { data } = useSession()

  const handleLogoutClick = () => {
    signOut()
  }

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

          <div className="hidden md:flex md:flex-row md:items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/">
                <HomeIcon size={18} className="md:mr-2" />
                Inicio
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/bookings">
                <CalendarIcon size={18} className="md:mr-2" />
                Agendamentos
              </Link>
            </Button>
            {!data?.user ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="default">
                    <CircleUserRoundIcon size={18} className="md:mr-2" />
                    Perfil
                  </Button>
                </AlertDialogTrigger>
                <DialogSignIn />
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="flex gap-2">
                    <Avatar className="md:w-8 md:h-8">
                      <AvatarImage src={data.user.image ?? ''} />
                      <AvatarFallback>
                        <UserCircleIcon />
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-base font-bold">{data.user.name}</p>
                    <LogOutIcon size={18} className="text-destructive" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-[318px] rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-bold text-center">
                      Sair
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-center">
                      Deseja sair da plataforma?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogCancel className="w-full mt-0">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-full"
                      onClick={handleLogoutClick}
                    >
                      Sair
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
