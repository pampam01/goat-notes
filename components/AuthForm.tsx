'use client'

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { loginAction, signupAction } from '@/actions/user';



interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {

  const isLoginForm = type === "login"

  const [transition, startTransition] = useTransition()
  const router = useRouter();


  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      let errMessage;

      if (isLoginForm) {
        errMessage = (await loginAction(email, password)).errMessage
      } else {
        errMessage = (await signupAction(email, password)).errMessage
      }

      if (!errMessage) {
        router.replace(`/${type}`)
      } else {
        toast(errMessage, {
          
          position: 'bottom-right',
          description: "ada error ",
          style: {
            background: 'red',
            color: 'white',

          }
        })
      }
    })
  }
  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={transition}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={transition}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {transition ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Register"
          )}
        </Button>
        <p className="text-xs">
          {!isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={!isLoginForm ? "/register" : "/register"}
            className={`text-blue-500 underline ${transition ? "pointer-events-none opacity-50" : ""}`}
          >
            {!isLoginForm ? "Login" : "Register"}
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

export default AuthForm