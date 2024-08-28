import axios from "axios"
const apiRequest=axios.create({
    baseURL:"https://real-estate-react-app-brown.vercel.app/api",
    withCredentials:true
})

export default apiRequest
