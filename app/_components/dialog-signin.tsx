'use-client'

import Image from 'next/image'
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

const DialogSignIn = () => {
  const handleLoginClickGoogle = () => {
    signIn('google')
  }
  const handleLoginClickGitHub = () => {
    signIn('github')
  }

  return (
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
  )
}

export default DialogSignIn
