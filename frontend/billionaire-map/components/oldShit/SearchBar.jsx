import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import countryDropDown from '../../data/countryDropDown'
import { searchBillionairesByCountry, setStateCountry } from '../../features/billionaireData/billionaireSlice'


function SearchBar() {
    const [country, setCountry] = useState(countryDropDown[0].value)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchBillionairesByCountry(country))
    }, [dispatch])



    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(country === ''){
            toast.error("Please, Select a Country")
        } else {
            dispatch(setStateCountry(country))
            dispatch(searchBillionairesByCountry(country))
        }
    }

    const handleChangeCountry = (value) => {
        setCountry(value.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex gap-2 mr-l-4'>
                <div className="w-48">
                    <Select 
                        className='mt-.5 shrink'
                        options={countryDropDown}
                        onChange={handleChangeCountry}
                        placeholder="United States"
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='mt-1 w-30 btn btn-sm'
                    >
                        Search
                    </button>
                </div>         
            </div>
        </form>
      )
  }

export default SearchBar