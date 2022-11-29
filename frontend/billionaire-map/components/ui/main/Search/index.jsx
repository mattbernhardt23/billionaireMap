import { Button } from '@components/ui/common'
import { countryDropDown } from "@utils/countryDropDown"
import { useState, useEffect } from 'react'
import Select from 'react-select'

export default function Search() {
    // const [country, setCountry] = useState(countryDropDown[0].value)
    
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(searchBillionairesByCountry(country))
    // }, [dispatch])



    // const handleSubmit = async (e) => {
    //     e.preventDefault()
        
    //     if(country === ''){
    //         toast.error("Please, Select a Country")
    //     } else {
    //         dispatch(setStateCountry(country))
    //         dispatch(searchBillionairesByCountry(country))
    //     }
    // }

    // const handleChangeCountry = (value) => {
    //     setCountry(value.value)
    // }

    return (
        <form 
            // onSubmit={handleSubmit}
        >
            <div className='flex'>
                <div className="w-full">
                    <Select 
                        className=" border-gray-500 border-2 border-b-4 border-r-0 rounded-l-md shadow-inner shadow-gray-500"
                        classNames={{
                            control: (state) =>
                              state.isFocused ? 'border-red-600' : 'border-grey-300',
                          }}
                        options={countryDropDown}
                        // onChange={handleChangeCountry}
                        placeholder="United States"
                        instanceId={"whatupbra"}
                    />
                </div>
                <div>
                    <Button
                        variant="searchLightGray"

                    >
                        Search
                    </Button>
                </div>         
            </div>
        </form>
      )
}