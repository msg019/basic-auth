import { User,ID } from "@/log/data"
import { addUser } from "@/log/db"
import { Hashear } from "@/log/functions"
import { randomUUID } from 'crypto'

export async function POST(req:Request){

    if(req.method=='POST'){
        try{
            const user:User = await req.json()
            const hash=Hashear(user.password)
            user.password=hash
            const id:ID= randomUUID()
            user.id=id
            
            const msg= await addUser(user)
            return Response.json({message:msg})

         }catch (err){
            console.error(err)

            return Response.json({message: 'Error'})
         } 
    }
    
}