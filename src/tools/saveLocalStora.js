export const saveLocalStora =(data)=>{
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user) )
}
export default saveLocalStora;