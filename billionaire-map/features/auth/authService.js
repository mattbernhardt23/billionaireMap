// Exists to make requests to our backend API
import axios from 'axios'

// Endpoint for all Auth
const API_URL = '/api/users'
 
//Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    // if(response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }

    return response.data
}   

const login = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData)

    // if(response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }

    return response.data
}

const logout = () => {return true}

const authService = {
    register,
    logout,
    login
}

export default authService