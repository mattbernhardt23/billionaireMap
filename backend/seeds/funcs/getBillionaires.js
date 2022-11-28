const axios = require("axios");
const dotenv = require('dotenv').config()
const countryData = require('../data/countryData')

const apiUrl = process.env.REACT_APP_BDB_URL  
const apiKey = process.env.REACT_APP_API_KEY

async function getBillionairesByCountry (country) 
{
    const options = {
        method: 'GET',
        url: apiUrl,
        params: {page: '0', size: '100', country: country},
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'forbes-worlds-billionaires-list.p.rapidapi.com',
            //'User-Agent' : 'axios 0.27.2'
        }
    };

    const data = await axios.request(options).then(function (response) { 
        //console.log(response.data.personLists)
    return response.data.personLists
    }).catch(function (error) {
	    console.error(error);
    });

    return data
}


async function getAllBillionaires (countries) {
    let arrayOfBillionaires;
    const retrievedData = Promise.all(countries.map(async (country) => {
        const data =  await getBillionairesByCountry(country)
        arrayOfBillionaires = [... data]
        return arrayOfBillionaires
    }))
    return retrievedData
}

async function getBillionairesByCountryPage1 (country) 
{
    const options = {
        method: 'GET',
        url: apiUrl,
        params: {page: '1', size: '100', country: country},
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'forbes-worlds-billionaires-list.p.rapidapi.com',
            //'User-Agent' : 'axios 0.27.2'
        }
    };

    const data = await axios.request(options).then(function (response) { 
        return response.data.personLists
    }).catch(function (error) {
	    console.error(error);
    });

    return data
}

module.exports = { getBillionairesByCountry, getAllBillionaires, getBillionairesByCountryPage1}