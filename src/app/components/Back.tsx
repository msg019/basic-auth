import Link from "next/link"


export const Back=()=>{
    return(
        <div className="absolute top-4 left-2.5">
            <Link 
                href="/"
                className="hover:cursor-pointer hover:brightness-90"
            >Home
            </Link>
         </div>
    )
}