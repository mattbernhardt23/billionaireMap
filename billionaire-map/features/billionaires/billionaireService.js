import axios from "axios";
import countryCoordinates from "@utils/countryCoordinates";

// const API_URL = '/api/billionaires/'
const API_URL = '/api/billionaires'
 
// Get Billionaires By Country
const getBillionaires = async (country) => {
    const options = {
        params: {country: country},
    };
    
    const response = await axios.get(API_URL, options)

    return response.data.billionaires
}

// Set Country
const setCountry = (place) => {
    const result = countryCoordinates.find(({country}) => country === place)
    return result
}

const getBillionaire = (billionaire) => {
    return billionaire
}

const billionaireService = {
    getBillionaires,
    setCountry,
    getBillionaire
}

export default billionaireService
