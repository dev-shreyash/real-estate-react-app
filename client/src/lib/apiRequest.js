import axios from "axios"
const apiRequest=axios.create({
    baseURL:"https://real-estate-react-app-2k8j.onrender.com/api",
    withCredentials:true
})

export default apiRequest