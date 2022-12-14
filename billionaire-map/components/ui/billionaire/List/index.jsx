import { Children } from "react"
import { BillionaireHeader } from "@components/ui/billionaire"

 
export default function List({billionaires, children}) {
  
  billionaires = [...billionaires]
  billionaires = billionaires.sort((a,b) => {
    return b.finalWorth - a.finalWorth;
});
     
    return (
        <>
      <div className={`w-full mt-4 border-2 h-200 rounded-md border-gray-500`}>
        <div>
          <BillionaireHeader />
        </div>
        <div className='overflow-y-auto h-32'>
            { billionaires.map(billionaire => children(billionaire))}
        </div>
      </div>
    </>
    )
  }
   