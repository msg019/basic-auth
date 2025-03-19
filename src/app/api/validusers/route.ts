import { User } from "@/log/data";
import { getPassw } from "@/log/db";
import { compareHash, Hashear } from "@/log/functions";
import { createToken } from '@/log/functions';
import { cookies } from 'next/headers';

let msg:string=''

export async function POST(req: Request){
    if(req.method=='POST'){
        try{
            const user:User= await req.json()
            const cookieStore= await cookies()
            

            user.password=Hashear(user.password)
            const passwClient=getPassw(user)

            
            const resultCompare= passwClient.then(async (dbHash)=>{
    
                const result=compareHash(dbHash, user.password)
                return result
            }) 

            if(await resultCompare){
                const token= await createToken()
                cookieStore.set('token', token,{
                    httpOnly: true
                })
                msg='/content'
            }else {
                msg='n'
            }
            
            return Response.json({message:msg})

            
        }catch{

            return Response.error()
        }
    }
}