import { useSelector } from 'react-redux'


 
export default function Map() {
  const { billionaires } = useSelector((state) => state.billionaireData)
  return (
    <>
      <div>
        Map
      </div>
    </>
  )
     
}