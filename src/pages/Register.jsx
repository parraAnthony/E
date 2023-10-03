
import {useForm} from "react-hook-form"
import "../style/register.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setPostRegister } from "../store/slices/tokenSlice"


const Register =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const registerUser =(data)=>{
        dispatch( setPostRegister(data))
        navigate("/login")
    }

        return(
            <main className="form-register-section">
                <form onSubmit={handleSubmit(registerUser)}>
                    <div>
                        <label htmlFor="first__name">First name</label>
                        <input 
                            type="text" 
                            id="first__name"
                            {...register("firstName", {required: true})}
                        />
                    </div>
                    <div>
                        <label htmlFor="last__name">Last name</label>
                        <input 
                            type="text" 
                            id="last__name"
                            {...register("lastName", {required: true})}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            {...register("email", {required: true})}    
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            {...register("password", {required: true})}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="number" 
                            id="phone"
                            {...register("phone", {required: true})}
                        />
                    </div>
                    <div className="buttonSignIn">
                        <button>sign in</button>
                    </div>
                </form>
                <div className="loginSectionInregister">
                <span>
                You already have a account?
                </span>
                <button onClick={()=>navigate("/login")} className="loginbutton-signin">Log in Here</button>
            </div>
            </main>
        )
}
export default Register;