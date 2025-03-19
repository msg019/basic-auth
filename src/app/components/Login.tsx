'use client'
import {  FormEvent, useState  } from "react"
import { Hashear } from "@/log/functions"
import { useRouter } from "next/navigation"


export const Login=()=>{
    const [toggle, setToggle]= useState<boolean>(false)
    const [wrongData, setWrongData]= useState<boolean>(false)
    const router = useRouter()
    const displayPassw= toggle ?<label className="pl-2">Hide Passwords</label> : <label className="pl-2">Show Passwords</label>


    const changeToggle=()=>{
        setToggle(!toggle)
    }

    const showPass= toggle ? 'text': 'password'

    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const {elements}=e.currentTarget

        const inputs=elements.namedItem('data')

        if(!inputs || inputs==null){return}

        const inputLits: string[]=[]
        Object.values(inputs).map(input=>{
            inputLits.push(input.value)
        })
        
        //Pre-hash password
        inputLits[1]=Hashear(inputLits[1])

        const user={
            'username': inputLits[0],
            'password': inputLits[1]
        }

        const res=await fetch('/api/validusers',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(user)
        })  

        const data= await res.json()
        if(data.message.length>4){
            router.push(data.message)
        }else{
            setWrongData(true)
        }

        setTimeout(()=>{
            setWrongData(false)
        },3000)
 
    }

    return(
        <div className="mt-10">
            <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-6">

                <div className="">
                    <label className="mr-4">Username</label>
                    <input 
                        className="bg-[#f0ffff] pl-3 text-blue-950 rounded-xl"
                        type="text"
                        maxLength={20}
                        name="data"
                        required
                    />
                </div>
                <div>
                    <label className="mr-4">Password</label>
                    <input 
                        className="bg-[#f0ffff] pl-3 text-blue-950 rounded-xl"
                        type={showPass}
                        maxLength={12}
                        minLength={8}
                        name="data"
                        required
                    />
                </div>
                <div className="flex ">
                    <input 
                        type="checkbox"
                        onClick={changeToggle}
                    />
                    {   
                        displayPassw
                    }
                </div>
                
                <button
                    className="bg-[#f0ffff] w-20 text-blue-950 rounded-xl 
                        hover:cursor-pointer shadow hover:bg-[#97dada] hover:text-blue-100"
                >
                    Enter
                </button>
                {
                    wrongData ? <p className="text-red-500">Wrong user or password</p> :''
                }
            </form>
        
        
        </div>
    )
}