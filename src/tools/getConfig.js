const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
});
export default getConfig;