import { Login } from "../components/Login"
import { Back } from "../components/Back"


const LoginMenu=()=>{
    return(
        <div className="flex flex-col justify-center items-center mt-20">
            
            <Back />

            <h1 className="text-4xl">Login</h1>
            <Login />
        </div>
    )
}

export default LoginMenu