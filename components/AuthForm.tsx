'use client'

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import {toast} from 'sonner'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';



interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({type}: AuthFormProps) => {

    const isLoginForm = type ==="login"

    const [transition, startTransition]= useTransition()
    const router = useRouter();


    const handleSubmit =  (formData: FormData) => {
        startTransition(async ()=> {
            const email = formData.get('email') as String
            const password = formData.get('password') as String

            let errMessage;

            if(isLoginForm){
                
            }else{

            }

            if(!errMessage){
                router.replace(`/?toastType=${type}`)
            }else{
                toast(errMessage, {
                    position:'bottom-right',
                    description:"ada error di sini",
                    style:{
                        background:'red',
                        color:'white',
                        
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
          "Sign Up"
        )}
      </Button>
      <p className="text-xs">
        {isLoginForm
          ? "Don't have an account yet?"
          : "Already have an account?"}{" "}
        <Link
          href={isLoginForm ? "/sign-up" : "/login"}
          className={`text-blue-500 underline ${transition ? "pointer-events-none opacity-50" : ""}`}
        >
          {isLoginForm ? "Sign Up" : "Login"}
        </Link>
      </p>
    </CardFooter>
  </form>
  )
}

export default AuthForm