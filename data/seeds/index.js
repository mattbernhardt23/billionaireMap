const { countryData, countryDataPart2 } = require("./data/countryData");
const dummyData = require("./data/dummyData");
const {
  getBillionairesByCountry,
  getAllBillionaires,
  getBillionairesByCountryPage1,
} = require("./funcs/getBillionaires");
const { getLocationForAll } = require("./funcs/getLocation");
const connectDB = require("./funcs/connectMongo");
const { db, collection } = require("./models/billionaireModel");
const Billionaire = require("./models/billionaireModel");

// Connect Database
connectDB();

async function page0Billionaires(allData) {
  Promise.all(
    allData.map(async (data) => {
      return await getBillionairesAndAddGeoData(data);
    })
  );
  return;
}

async function getBillionairesAndAddGeoData(data) {
  const allItems = await getBillionairesByCountry(data);
  const locatedData = await getLocationForAll(allItems);
  await sendDataToDatabase(locatedData);
  console.log(`Finished ${data}`);
}

// Run for All Countries with Only One Page
// Last time, we had to split the country data list into to seperate segments in order to avoid the 504 timeout error.

// page0Billionaires(countryData);

async function page1Billionaires(allData) {
  Promise.all(
    allData.map(async (data) => {
      return await getBillionairesAndAddGeoData1(data);
    })
  );
  return;
}

async function getBillionairesAndAddGeoData1(data) {
  const allItems = await getBillionairesByCountryPage1(data);
  const locatedData = await getLocationForAll(allItems);
  await sendDataToDatabase(locatedData);
  console.log(`Finished ${data}`);
}

// Run for All the Countries with Two Pages
// page1Billionaires(countryDataPart2);

const sendDataToDatabase = async (allData) => {
  Promise.all(
    allData.map(async (data) => {
      console.log(data);
      const billionaire = new Billionaire({
        country: data.country,
        city: data.city,
        state: data.state,
        person: {
          name: data.person.name,
          imageExists: data.person.imageExists,
        },
        category: data.category,
        industries: data.industries,
        source: data.source,
        finalWorth: data.finalWorth,
        birthDate: data.birthDate,
        age: data.age,
        bios: data.bios,
        squareImage: data.squareImage,
        geoLocation: {
          lat: data.geoLocation?.lat,
          lng: data.geoLocation?.lng,
        },
      });

      await billionaire.save();
    })
  );
};

// Clear entire database
const deleteAllEntries = async () => {
  await Billionaire.deleteMany({});
};

// deleteAllEntries();
