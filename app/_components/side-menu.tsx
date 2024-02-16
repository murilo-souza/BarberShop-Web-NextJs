'use client'

import {
  CalendarIcon,
  CircleUserIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react'

import { SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'

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

const SideMenu = () => {
  const { data } = useSession()

  const handleLogoutClick = () => {
    signOut()
  }

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center gap-3 ">
            <Avatar>
              <AvatarImage src={data.user.image ?? ''} />
            </Avatar>

            <h2 className="font-bold capitalize">{data.user.name}</h2>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" size="icon">
                <LogOutIcon />
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
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <CircleUserIcon className="text-secondary" />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="secondary" className="w-full justify-start">
                <LogInIcon className="mr-2" />
                Fazer Login
              </Button>
            </AlertDialogTrigger>
            <DialogSignIn />
          </AlertDialog>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Inicio
          </Link>
        </Button>
        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}

export default SideMenu
