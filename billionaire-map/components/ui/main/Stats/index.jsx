import { countryCoordinates } from "@utils/countryCoordinates"

export default function Stats({billionaires}) {

if(billionaires[0]?.country !== undefined) {    
const totalWealth = () => { 
    const num = billionaires.reduce((accumulator, currentValue) => accumulator + currentValue.finalWorth, 0)
    const newNum = new Intl.NumberFormat().format(num/100000)
    return newNum
}

const wealth = totalWealth()

const country = billionaires[0].country
const result = countryCoordinates.find(element => element.country === country)
const percentage = ((wealth * 100000)/result.wealth).toFixed(2) 


    return (
        <div className="h-full flex flex-col content-around ml-1">
            <div className="bg-gray-600 h-full w-full rounded-t-lg text-white flex">
                <div className="m-auto">Total Billionaires in Dataset</div>    
            </div>
            <div className="bg-white text-gray-600 h-full w-full flex border-x-2 border-gray-600">
                <div className="m-auto">{billionaires.length}</div>    
            </div>
            <div className="bg-gray-600 h-full w-full text-white flex">
                <div className="m-auto">Wealth of All Billionaires</div>    
            </div>
            <div className="bg-white h-full w-full text-gray-600 flex border-x-2 border-gray-600">
                <div className="m-auto">{`$${wealth} Trillion`}</div>    
            </div>
            <div className="bg-gray-600 h-full w-full text-white flex">
                <div className="m-auto">Percent of National Wealth</div>    
            </div>
            <div className="bg-white h-full w-full text-gray-600 flex border-x-2 border-b-2 border-gray-600 rounded-b-lg">
                <div className="m-auto">
                    {percentage}%
                </div>    
            </div>

        </div>
            
    )
}
}
