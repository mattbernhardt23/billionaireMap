import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { Marker, NavigationControl, Source, Layer, Popup } from 'react-map-gl'
import { Loader } from '@components/ui/common'
import { ToggleButtons, SVG } from '@components/ui/main'
import { useCallback, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setViewState } from '@features/billionaires/billionaireSlice'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from "@utils/layers"


export default function MapHome() {
  const { billionaires, viewState, isLoading } = useSelector((state) => state.billionaireData)
  const dispatch = useDispatch()

  const [mapView, setMapView] = useState('pins')
  const [popupInfo, setPopupInfo] = useState(null)

  
  
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhld2Jlcm5oYXJkdCIsImEiOiJjbDYzejZpaGYwaGg1M2tsdmViOW05Zmw1In0.ILKwMbc0ahbTlF9HvQeGyQ'


  const moveMap = useCallback(evt => {
    dispatch(setViewState(evt.viewState))
  }, [viewState])

  // Clusters or Pins
const handleMapView = (value) => {
  setMapView(value)
}

// Set the Data for the Cluster
let clusterGeoData = {};
  clusterGeoData.type = "FeatureCollection";
  clusterGeoData.features = [];

  if(billionaires) {
    clusterGeoData.features = billionaires.map((billionaire) => ({
      type: 'Feature',
      properties: {
        name: billionaire.person.name
      },
      geometry: {
        type: 'Point',
        coordinates: [billionaire.geoLocation.lng, billionaire.geoLocation.lat]
      }
    }))
  }

  const pins = useMemo(
    () => 
    billionaires.map((billionaire, index) => (
      <Marker
        latitude={billionaire.geoLocation.lat} 
        longitude={billionaire.geoLocation.lng} 
        anchor='bottom'
        key={billionaire._id}
        onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(billionaire);
            console.log("popup info", popupInfo)
            console.log("billionaire", billionaire)
        }}
      >
        <SVG />
      </Marker>
    ))
    )


  if(isLoading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center p-5">
        <Loader />
      </div>
    )
  }
  return (
    <>
      <main className="flex flex-1 flex-col justify-center items-center p-5">
        <Map
          latitude={viewState.latitude}
          longitude={viewState.longitude}
          zoom={viewState.zoom}
          doubleClickZoom={true}
          style={{width: 750, height: 500}}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onMove={moveMap}
        >
          {mapView === 'pins' &&  pins}
          {popupInfo && (
          <dir className="p-1">
          <Popup
            className='border-2 border-gray-900 rounded-md flex flex-col'
            anchor="top"
            longitude={Number(popupInfo.geoLocation.lng)}
            latitude={Number(popupInfo.geoLocation.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div className='border-2 border-gray-900 rounded-md flex flex-col p-3'>
              <div>
                {popupInfo.person.name}
              </div>
              <div>
                {`$${popupInfo.finalWorth/1000} B`} 
              </div> 
            </div>
          </Popup>
          </dir>  
        )}
          {mapView === 'clusters' &&
            <Source
              id="earthquakes"
              type="geojson"
              data={clusterGeoData}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          }
          <div className='flex flex-end'>
            <div className='flex flex-col'>
              <NavigationControl />
              <ToggleButtons mapView={handleMapView}/>  
            </div>
          </div>
        </Map>
      </main>
    </>
    
  )
     
}