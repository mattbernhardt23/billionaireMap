import { Map, Stats, Search } from "@components/ui/main"
import { BillionaireList, BillionaireCard, BillionaireModal } from "@components/ui/billionaire"
import { useSelector, useDispatch } from "react-redux"
import { getBillionaire} from "@features/billionaires/billionaireSlice"
import { useState} from "react"


export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { billionaires, billionaire } = useSelector((state) => state.billionaireData)



  return (
    <div className='flex flex-col'>
    <div className='flex flex-row'>
        <div className="w-2/3 pr-1 pt-2">
          <Search />
          <BillionaireList
            billionaires={billionaires}
          >
            {billionaire => {
              return (
              <BillionaireCard
                key={billionaire._id}    
                billionaire={billionaire}
                onClick={() => {
                  dispatch(getBillionaire(billionaire))
                  setModalIsOpen(true)
                }}
              />
            )}}
          </BillionaireList>
          <BillionaireModal     
            modalIsOpen={modalIsOpen}
            onClose={() => {
              dispatch(getBillionaire(null))
              setModalIsOpen(false)
            }}
          />
          
        </div>
        <div className="w-1/3">
          <Stats />
        </div>
    </div>
        <Map />
    </div>
  )
}
