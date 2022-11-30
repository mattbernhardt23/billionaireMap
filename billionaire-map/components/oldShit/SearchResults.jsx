import { toast } from 'react-toastify'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import BillionaireItem from './BillionaireItem'
import Spinner from './Spinner'



function SearchResults() {

const { billionaires, isLoading } = useSelector((state) => state.billionaireData)

const [open, setOpen] = useState(true)

const toggle = () => {
    setOpen(!open)
}

let arrayForSort = [...billionaires]

let sortBillionaires = arrayForSort.sort((a,b) => {
    return b.finalWorth - a.finalWorth;
});
    
if(!billionaires) {
    return <Spinner />
}


return (
    <div className='w-screen mx-auto'>
        <button 
            className='btn w-full sticky'
            onClick={toggle}
        >
            Show Search Results
        </button>
        <div>
        {open && 
            <div className='scroll-smooth'>
                {sortBillionaires.map((billionaire) => (
                    < BillionaireItem 
                    key={billionaire._id} billionaire={billionaire}
                    />
                 ))
                }
            </div>
        }
        </div>
    </div>
)
}


export default SearchResults