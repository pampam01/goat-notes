import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkmodeToggle';
import LogoutButton from './LogoutButton';
import { getUser } from '@/utils/supabase/server';

const Header = async () => {
  const user = await getUser();
  const isLoggedIn = !!user;

  return (
    <header
      className='relative flex h-24 w-full items-center justify-between bg-popover px-4 sm:px-8 shadow-xl'
    >
      <Link href={"/"}
        className='flex items-end justify-center gap-3'
      >
        <Image
          src={"/goatius.png"}
          alt='kambing'
          width={60}
          height={60}
          className='rounded-full'
          priority
        />

        <h1
          className='flex flex-col pb-1 text-2xl font-semibold  leading-6'
        >Goat <span
          className='text-primary font-bold'
        >
            Notes</span>
        </h1>
      </Link>




      <div className='flex items-center gap-4'>

        {isLoggedIn ? (
         <LogoutButton />
        ): (
          <>
             <Button 
          asChild
          
          variant={'secondary'}
          >
           <Link href={"/register"}>
           Register
           </Link>
          </Button>
          <Button 
          asChild
          className='text-white bg-black'
          variant={'default'}
          >
           <Link href={"/login"}>
           Login
           </Link>
          </Button>
          </>
        )}

        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header