import ReactMapGL, { Popup } from 'react-map-gl';
import Image from "next/image"

export default function CustomPopup({popupInfo, onClick, onClose}){
  return (
    <Popup
        className='flex flex-col'
        anchor="top"
        longitude={Number(popupInfo.geoLocation.lng)}
        latitude={Number(popupInfo.geoLocation.lat)}
        onClose={onClose}
        closeButton={true}
        closeOnClick={false}
    >
        <div className="flex justify-center">
        {popupInfo.person.imageExists ? 
          <Image
            className="rounded-md shadow-md"
            src={popupInfo.squareImage.startsWith("https") 
                ? popupInfo.squareImage 
                :`https://${popupInfo.squareImage}`
              }
            alt={"billionaireImage"}
            height={50}
            width={50}
          />
          :
          <Image
            className="rounded-md shadow-md backdrop-grayscale"
            src={"/NoImage.png"}
            alt={"noImage"}
            height={50}
            width={50}
          />
        }
        </div>
        <div 
          className="flex justify-center text-sm hover:underline hover:cursor-pointer"
          onClick={() => onClick(popupInfo)}  
        >
            {popupInfo.person.name}
        </div>
        <div>
            {`$${popupInfo.finalWorth/1000} B`} 
        </div>
        <div className="text-xs">
            {popupInfo.source.toUpperCase()}
        </div> 
    </Popup>
  )}