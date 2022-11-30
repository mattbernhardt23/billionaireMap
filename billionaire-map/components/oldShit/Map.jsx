import {useState, useEffect, useCallback} from 'react'
import { useSelector } from 'react-redux';
import ReactMapGl, { Marker, NavigationControl, Source, Layer } from 'react-map-gl'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './mapComponents/layers';
import mapboxgl from 'mapbox-gl'
import Spinner from './Spinner';
import Svg from './Svg'
import createRef from 'react-map-gl/dist/esm/mapbox/create-ref';
import ToggleButtons from './mapComponents/ToggleButtons';

function Map() {
  const { billionaires, country, isLoading } = useSelector((state) => state.billionaireData)

  /*let viewport = {
    latitude: country.geoLocation.lat,
    longitude: country.geoLocation.lng,
    zoom: country.zoom
  }
*/
  let defaultView = {
    latitude: country.geoLocation.lat,
    longitude: country.geoLocation.lng,
    zoom: country.zoom
  }


  const [viewport, setViewport] = useState(defaultView)
  const [mapView, setMapView] = useState('pins')
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(null)

  /*const goToCountry = (country) => {
    setViewport({
      latitude: country.geoLocation.lat,
      longitude: country.geoLocation.lng,
      zoom: 3
    })
  }
  */

  useEffect(() => {
    setViewport(country);

  }, [country])

// Clusters or Pins
const handleMapView = (value) => {
  setMapView(value)
  if (value === 'clusters') setInteractiveLayerIds([clusterLayer.id])
  else setInteractiveLayerIds(null)
}

// Set the Reference for the Cluster 
const mapRef = createRef(null)

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



const onClick = e => {
    const feature = e.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('earthquakes')

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500
      });
    });
}

  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhld2Jlcm5oYXJkdCIsImEiOiJjbDYzejZpaGYwaGg1M2tsdmViOW05Zmw1In0.ILKwMbc0ahbTlF9HvQeGyQ'

  if(isLoading){
    return <Spinner />
  } else {
    console.log(viewport)
  return (
    <div className='h-full '>
    
    <ReactMapGl
      latitude={viewport.geoLocation?.lat || 0}
      longitude={viewport.geoLocation?.lng || 0}
      zoom={viewport?.zoom || 1}
      doubleClickZoom={true}
      mapStyle={'mapbox://styles/mapbox/satellite-streets-v11'}
      interactiveLayerIds={interactiveLayerIds}
      onMove={(country) => {console.log(country); setViewport(country.viewState)}}
     >
    
      {mapView === 'pins' &&  
          billionaires.map((billionaire) => (
            <Marker 
              latitude={billionaire.geoLocation.lat} 
              longitude={billionaire.geoLocation.lng} 
              anchor='bottom'
              key={billionaire._id}
            >
              <Svg />
            </Marker>
          ))
      }
  
      {mapView === 'clusters' &&
          <Source
          id="earthquakes"
          type="geojson"
          data={clusterGeoData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={mapRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      }
     
        <div className='flex flex-start'>
            <NavigationControl />
            <ToggleButtons mapView={handleMapView}/>
        </div>
    </ReactMapGl>
  
    </div>
    
  )
  }
}

export default Map