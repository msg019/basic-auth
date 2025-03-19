'use client'
import { useRouter } from "next/navigation"
import { Back } from "../components/Back"


const Content=()=>{
    const router=useRouter()

    const Logout=async()=>{

        const res= await fetch('/api/delcookie',{
            method: 'GET',
            credentials: 'include'
        })
        
        const data= await res.json()
        router.push(data.message)
        
    }


    return(
        <div className="flex flex-col mt-20 justify-center items-center">
            <Back />
            <div className="absolute top-10 left-2.5">
                <button 
                    className="hover:cursor-pointer hover:brightness-90"
                    onClick={Logout}
                >Logout
                </button>     
            </div>
            <h1 className="text-4xl">Hello!!</h1>
            <p className="mt-10">You are in the app</p>
        </div>
    )
}

export default Content