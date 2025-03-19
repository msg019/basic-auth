import { Back } from "../components/Back"
import { Register } from "../components/Register"


const RegisterMenu=()=>{
    return(
        <div className="flex flex-col justify-center items-center mt-20">
            <Back />
            <h1 className="text-4xl">Register</h1>
            <Register />
        </div>
    )
}

export default RegisterMenu