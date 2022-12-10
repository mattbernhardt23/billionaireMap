import { Button } from '@components/ui/common'
import { countryDropDown } from "@utils/countryDropDown"
import { useDispatch, useSelector } from 'react-redux'
import { searchBillionairesByCountry } from '@features/billionaires/billionaireSlice'
import { useState, useEffect } from 'react'
import Select from 'react-select'


export default function Search() {
    const [country, setCountry] = useState(countryDropDown[0].value)
    
    const dispatch = useDispatch()

    const callDispatch= (() => dispatch(searchBillionairesByCountry(country)))
    
    useEffect(() => {
        callDispatch()
    }, [])

 

    const onClick = async (e) => {
        // e.preventDefault()
        
        if(country === ''){
            toast.error("Please, Select a Country")
        } else {
            // dispatch(setCountry(country))
            dispatch(searchBillionairesByCountry(country))
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