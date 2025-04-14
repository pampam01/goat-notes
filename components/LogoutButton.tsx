'use client'

import React, { useState } from 'react'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/user';

const LogoutButton = () => {
    
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleLogout =async () => {
        setLoading(true)

       const {errMessage} = await logoutAction();

        if(!errMessage){
            toast(
                 "Logout berhasil",
                 {
                    description:"berhasil ",
                    className:'bg-red-500',
                    duration:1000,
                    position:'bottom-right'

                   
                 }
            )
        router.push("/login")
        setLoading(false)

        }else{
            toast(errMessage, {
                position:'bottom-right',
                description:"ada error di sini",
                style:{
                    background:'red',
                    color:'white',
                    
                }
            })

        setLoading(false)
        }



    }
    return (
        <Button
        onClick={handleLogout}
        disabled={loading}
        variant={'outline'}
        >
            {
                loading ? (
                    <Loader2 className='animate-spin' />
                ) : (
                    "Logout"
                )
            }
        </Button>
    )
}

export default LogoutButton