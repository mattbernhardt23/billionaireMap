import { Button } from '@components/ui/common'
import { countryCoordinates } from "@utils/countryCoordinates"
import { countryDropDown } from "@utils/countryDropDown"
import { useDispatch, useSelector } from 'react-redux'
import { searchBillionairesByCountry, setViewState } from '@features/billionaires/billionaireSlice'
import { useState, useEffect, useCallback } from 'react'
import Select from 'react-select'


export default function Search({setInitialView}) {
    const { viewState } = useSelector((state) => state.billionaireData)
    const [country, setCountry] = useState(countryDropDown[0].value)
    
    const dispatch = useDispatch()

    // Created a function to call the dispatch becasue dispatching from inside a useEffect is not permitted. 
    const callBillionaireDispatch= (() => dispatch(searchBillionairesByCountry(country)))
    

    useEffect(() => {
        callBillionaireDispatch()
    }, [])


    const onClick = async (e) => {
        const result = countryCoordinates.find(element => element.country === country)
        const viewport = {
            latitude: result.lat,
            longitude: result.lng,
            zoom: result.zoom,
        }
        if(country === ''){
            toast.error("Please, Select a Country")
        } else {
            dispatch(searchBillionairesByCountry(country))
            setInitialView(viewport)
        }
    }

    const handleChangeCountry = (value) => {
        setCountry(value.value)
    }

    return (
            <div className='flex'>
                <div className="w-full">
                    <Select 
                        className=" border-gray-500 border-2 border-b-4 border-r-0 rounded-l-md shadow-inner shadow-gray-500"
                        classNames={{
                            control: (state) =>
                              state.isFocused ? 'border-red-600' : 'border-grey-300',
                          }}
                        options={countryDropDown}
                        onChange={handleChangeCountry}
                        placeholder="United States"
                        instanceId={"anythingCanGoHereClearsPropsIdError"}
                    />
                </div>
                <div>
                    <Button
                        variant="searchLightGray"
                        onClick={onClick}
                    >
                        Search
                    </Button>
                </div>         
            </div>
      )
}