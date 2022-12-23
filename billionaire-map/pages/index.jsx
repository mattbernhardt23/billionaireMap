import { Map, Stats, Search } from "@components/ui/main"
import { BillionaireList, BillionaireCard, BillionaireModal } from "@components/ui/billionaire"
import { useSelector, useDispatch } from "react-redux"
import { getBillionaire } from "@features/billionaires/billionaireSlice"
import { useState} from "react"


export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [initialView, setInitialView] = useState({
    latitude: 37.4,
    longitude: -95.712,
    zoom: 3
  })
  const dispatch = useDispatch()
  const { billionaires } = useSelector((state) => state.billionaireData)

  const onClick = (billionaire) => {
    dispatch(getBillionaire(billionaire))
    setModalIsOpen(true)
  }


  return (
    <div className='flex flex-col'>
    <div className='flex flex-row pt-2 content-between'>
        <div className="w-2/3 pr-1">
          <Search 
            setInitialView={setInitialView}
          />
          <BillionaireList
            billionaires={billionaires}
          >
            {billionaire => {
              return (
              <BillionaireCard
                key={billionaire._id}    
                billionaire={billionaire}
                onClick={onClick}
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
          <Stats 
            billionaires={billionaires}
          />
        </div>
    </div>
        <Map 
          initialView={initialView}
          onClick={onClick}
        />
    </div>
  )
}
