'use server'

import { handleError } from "@/lib/utils"
import { createClient } from "@/utils/supabase/server"



export const loginAction =async (email: string, password: string)=>{
    try{
        const {auth} = await createClient()
        const {error} = await auth.signInWithPassword({
            email,
            password,
        })
        if(error) throw error

        return {errMessage: null}
    }catch(error){
        return handleError(error)
    }
}

export const logoutAction= async () => {
    try{
        const {auth} = await createClient()
        const {error} = await auth.signOut()
        if(error) throw error

        return {errMessage: null}
    }catch(error){
        return handleError(error)
    }
}


export const signupAction = async (email: string, password:string)=> {

    try {
        const {auth} =await createClient();

        const {data, error} = await auth.signUp({
            email,
            password
        });

        if(error) throw error

        const userid = data.user?.id

        if(!userid) throw new Error('Error User ID not found')


            // insert user into database

            return {errMessage: null}
    } catch (error) {
        return handleError(error)
    }
}



