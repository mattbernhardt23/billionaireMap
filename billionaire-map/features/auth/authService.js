// Exists to make requests to our backend API
import axios from 'axios'

 
// Endpoint for all Auth
const API_URL = '/api/users'
 
//Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    return response.data
}   

const login = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData)
    
    return response.data
}

const getUser = async (data) => {
    const response = await axios.post(API_URL + "/me", data)
  
    return response.data
}


const logout = async () => {
    const response = await axios.post(API_URL + "/delete")

    return response.data
}

const authService = {
    register,
    logout,
    login,
    getUser
}

export default authService