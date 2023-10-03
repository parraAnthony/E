import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter =()=>{
    const token = localStorage.getItem("userToken")
        if(token){
            return (
            <>
                <Outlet/>
            </>)
        }else{
            return (<Navigate to="/login"/>)
        }
}
export default ProtectedRouter;