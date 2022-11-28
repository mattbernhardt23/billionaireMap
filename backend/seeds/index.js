const {countryData, countryDataPart2 }= require('./data/countryData');
const dummyData = require('./data/dummyData')
const {getBillionairesByCountry, getAllBillionaires, getBillionairesByCountryPage1} = require('./funcs/getBillionaires')
const {getLocationForAll} = require('./funcs/getLocation')
const connectDB = require('./funcs/connectMongo')
const { db, collection } = require('../models/billionaireModel');
const e = require('express');


// Connect Database
connectDB();

async function theWholeShiBangBang (allData) {
    
    Promise.all(allData.map(async (data) => {
        return await theWholeShiBang(data)
    }))
    return
}

async function theWholeShiBang (data) {
    const allItems = await getBillionairesByCountry(data)
    const locatedData = await getLocationForAll(allItems)
    await sendDataToDatabase(locatedData)
    console.log(`Finished ${data}`)
}
// Run for All Countries with Only One Page
theWholeShiBangBang(countryData)

async function theWholeShiBangBangPart2 (allData) {
    
    Promise.all(allData.map(async (data) => {
        return await theWholeShiBangPart2(data)
    }))
    return
}

async function theWholeShiBangPart2 (data) {
    const allItems = await getBillionairesByCountryPage1(data)
    const locatedData = await getLocationForAll(allItems)
    await sendDataToDatabase(locatedData)
    console.log(`Finished ${data}`)
}

// Run for All the Countries with Two Pages
theWholeShiBangBangPart2(countryDataPart2)

const sendDataToDatabase = async (data) => {
    try {
        const docs = data;
        await collection.insertMany(docs)
    } catch (e) {
        console.log(e)
    }
}


