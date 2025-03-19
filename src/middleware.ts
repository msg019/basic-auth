import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { key, secret_value } from "./log/data"


export async function middleware(req:NextRequest){
    const token= req.cookies.get('token')

    //Delete cookie
    if(req.method=='GET' && req.nextUrl.pathname=='/api/delcookie'){
        if (token){
            const resp= NextResponse.next()
            resp.cookies.delete('token')
            return resp
        }
    }

    //Protect routes
    if(req.method=='GET' && req.nextUrl.pathname==('/content')){
        try{

            if(!token){
                return NextResponse.redirect(new URL('/login',req.nextUrl))
            }

            const { payload }= await jwtVerify(token.value, new TextEncoder().encode(key),{algorithms: ["HS256"]})

            if(payload.value===secret_value){
                return NextResponse.next()
            }else{
                return NextResponse.redirect(new URL('/login',req.nextUrl))
            }

        }catch (error){
            console.error(error)
            return NextResponse.redirect(new URL('/login',req.nextUrl))
        }
    }

    

    return NextResponse.next()
    
}

export const config={
    matcher: ["/api/delcookie/:path*","/content"]
}