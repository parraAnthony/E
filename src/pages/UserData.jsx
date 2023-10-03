import { Outlet } from "react-router-dom";

const UserData =()=>{

    const dataUser = JSON.parse(localStorage.getItem("userData"))

    return(
        <>
            <Outlet />
            {dataUser && (
                <div
                style={{height:"92vh",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent: "space-between",
                        }}>
                    <h1 
                    style={{marginTop:"20px",
                            width:"100%",
                            backgroundColor:"#25496d",
                            color:"white",
                            padding:"5px"}}>User Data</h1>
                    <div
                    style={{height:"50%",
                    border:"2px solid",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    padding:"10px",
                    transform: "translateY(-50%)"}}
                    className="userData">

                        <div>
                            <h2>Name</h2>
                            <p>{dataUser.firstName} {dataUser.lastName}</p>
                        </div>
                        <hr />
                        <div className="emailData">
                            <h2>Email</h2>
                            <p>{dataUser.email}</p>
                        </div>
                        <hr />
                        <div>
                            <h2>Phone</h2>
                            <p>{dataUser.phone}</p>
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    )
}
export default UserData;