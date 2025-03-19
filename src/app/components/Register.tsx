'use client'
import {  FormEvent, useEffect, useState  } from "react"
import { Hashear } from "@/log/functions"
import { User } from "@/log/data"

export const Register=()=>{
    const [toggle, setToggle]= useState<boolean>(false)
    const [infoPassw, setInfoPassw]= useState<boolean>(true)
    const [msg, setMsg]=useState<string>('')
    const[passw1, setPassw1]=useState<string>('')
    const[passw2, setPassw2]=useState<string>('')

    const showPass= toggle ? 'text': 'password'
    const warnPass= infoPassw ? true : false
    const displayPassw= toggle ?<label className="pl-2">Hide Passwords</label> : <label className="pl-2">Show Passwords</label>

    const changeToggle=()=>{
        setToggle(!toggle)
    }

    const comparePassword=()=>{
        if(passw1 != passw2 || passw1.length !=passw2.length){
            setInfoPassw(false)
        }else{
            setInfoPassw(true)
        }
    }


    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const {elements}=e.currentTarget

        const inputs=elements.namedItem('data')

        if(!inputs || inputs==null){return}

        const inputLists: string[]=[]
        Object.values(inputs).map(input=>{
            inputLists.push(input.value)
        })
        
        //Pre-hash password
        inputLists[1]=Hashear(inputLists[1])
        inputLists[2]=Hashear(inputLists[2])

        const user:User={
            id: '----',
            username: inputLists[0],
            password: inputLists[1]
        }
        if(user.password!=inputLists[2]){
            setMsg("Passwords don't match")
            setTimeout(()=>{
                setMsg('')
            },4000)

            return

        }
        const res=await fetch('/api/users',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(user)
        })  

        const data= await res.json()
        setMsg(data.message)

        //active message
        setTimeout(()=>{
            setMsg('')
        },4000)

        //Clean inputs
        Object.values(inputs).map(input=>{
            input.value=''
        })

    }

    useEffect(()=>{
        comparePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[passw1, passw2])

    return(
        <div className="mt-10">
            <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-3">
            <div className="flex flex-col gap-6 justify-center items-end">
                <div>
                    <label className="mr-4">Username</label>
                    <input 
                        className="bg-[#f0ffff] pl-3 text-blue-950 rounded-xl"
                        type="text"
                        maxLength={20}
                        name="data"
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
                            onChange={(e)=>setPassw1(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="mr-4">Confirm Password</label>
                        <input 
                            className="bg-[#f0ffff] pl-3 text-blue-950 rounded-xl"
                            type={showPass}
                            maxLength={12}
                            minLength={8}
                            name="data"
                            onChange={(e)=>setPassw2(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <p 
                        className="text-red-500"
                        hidden={warnPass}
                    >Passwords don&apos;t match
                    </p>
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
                    Register
                </button>
            </form>
            <div className="flex justify-center items-center">
                {
                    msg.length>2 ? <p>{msg}</p> :''
                }
            </div>   
        </div>
    )
}