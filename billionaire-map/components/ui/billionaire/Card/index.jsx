import { useDispatch} from 'react-redux'
import { getBillionaire } from '@features/billionaires/billionaireSlice'


  
export default function Card({onClick, billionaire}) {
    const dispatch = useDispatch()

    const handleClick = () => { 
        dispatch(getBillionaire(billionaire))
    }
  
  return (
    
    <>
        <div className="grid grid-cols-12 text-red-900" >
            <div className="col-span-2" >
                <div className="flex justify-center" >
                    {`$${billionaire.finalWorth/1000} B`}
                </div>
            </div>
            <div className="col-span-5" > 
                <div 
                    onClick={() => onClick(billionaire)}
                    className="flex justify-center text-sm sm:text-base leading-tight font-medium hover:underline hover:cursor-pointer" 
                >
                    {billionaire.person.name.substring(0, 22)}       
                </div>
            </div>
            <div className="col-span-1">
                <div className="flex justify-center">
                    {billionaire.age}
                </div>
            </div>
            <div className="col-span-4" >
                <div className="flex justify-center" >
                    {billionaire.category}
                </div>
            </div>
        </div>
      </> 
  )
      
}
