import axios from "axios"
const apiRequest=axios.create({
    baseURL:"hhttps://real-estate-react-app-knh7.onrender.com/api",
    withCredentials:true
})

export default apiRequest
