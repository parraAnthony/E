import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {useDispatch } from "react-redux"
import { setPostLogin } from "../store/slices/tokenSlice"
import "../style/login.css"

const Login=()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    
    const loginUser =(data)=>{
        dispatch( setPostLogin(data)) 
        navigate("/")

    }
    return(
        <main className="form-section">
            <form onSubmit={handleSubmit(loginUser)}>
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
                <div className="buttonLogin">
                    <button>Log in</button>
                </div>
            </form>
            <div className="registerSectionInLogin">
                <span>
                You don't have a account?
                </span>
                <button onClick={()=>navigate("/register")} className="registerbutton-Login">Register Here</button>
            </div>
            
        </main>
    )
}
export default Login;