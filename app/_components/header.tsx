'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import {
  CalendarIcon,
  CircleUserRoundIcon,
  MenuIcon,
  UserCircleIcon,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './side-menu'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signIn, signOut, useSession } from 'next-auth/react'
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

interface HeaderProps {
  hiddenMobile?: string
}

const Header = ({ hiddenMobile = '' }: HeaderProps) => {
  const { data } = useSession()

  const handleLogoutClick = () => {
    signOut()
  }

  const handleLoginClickGoogle = () => {
    signIn('google')
  }
  const handleLoginClickGitHub = () => {
    signIn('github')
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

          <div className="hidden md:flex md:flex-row md:items-center gap-6">
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
                <AlertDialogContent className="w-[318px] rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-bold text-center">
                      Faça login na plataforma
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-center">
                      Conecte-se usando sua conta do Google ou Github.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogAction
                      className="w-full bg-transparent hover:bg-secondary"
                      onClick={handleLoginClickGoogle}
                      asChild
                    >
                      <Button variant="outline">
                        <Image
                          src="/google.png"
                          alt="Google"
                          width={14}
                          height={14}
                          className="mr-2"
                        />
                        Google
                      </Button>
                    </AlertDialogAction>
                    <AlertDialogAction
                      className="w-full bg-transparent hover:bg-secondary"
                      onClick={handleLoginClickGitHub}
                      asChild
                    >
                      <Button variant="outline">
                        <Image
                          src="/github.png"
                          alt="Google"
                          width={16}
                          height={16}
                          className="mr-2"
                        />
                        GitHub
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
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
