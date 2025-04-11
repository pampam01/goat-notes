'use client'

import React, { useState } from 'react'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleLogout =async () => {
        setLoading(true)

        await new Promise((resolve, reject)=> setTimeout(resolve, 2000))

        const errMessage = 'errror jok' 

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


        router.push("/")

        setLoading(false)
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