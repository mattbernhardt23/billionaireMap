import {useState} from 'react'
import { useSelector } from 'react-redux';
import ReactMapGl, { Marker, NavigationControl, Source, Layer, GeoJSONSource } from 'react-map-gl'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../../utils/layers';
import mapboxgl from 'mapbox-gl'
import Spinner from './Spinner';
import Svg from './Svg'
import createRef from 'react-map-gl/dist/esm/mapbox/create-ref';
import ToggleButtons from './mapComponents/ToggleButtons';

function Map() {
  const defaultView = {
    lat: 39.09024,
    lng: -107.712891,
    zoom: 3,
    //width: window.innerWidth,
    //height: window.innerHeight,
  }

  const [viewState, setViewState] = useState(defaultView)
  const [mapView, setMapView] = useState('pins')
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(null)


  const { billionaires, country, isLoading } = useSelector((state) => state.billionaireData)



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
  return (
    <div className='h-full '>
    <ReactMapGl
      initialViewState={{
        latitude: 39.7609887,
        longitude: -104.9650755,
        zoom: 3
      }}
      mapStyle={'mapbox://styles/mapbox/satellite-streets-v11'}
      onViewStateChange={(country) => setViewState(country)}
      interactiveLayerIds={interactiveLayerIds}
      doubleClickZoom={true}
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
          <div>
            <NavigationControl />
          </div>
          <div>
            <ToggleButtons mapView={handleMapView}/>
          </div>
        </div>
    </ReactMapGl>
    </div>
    
  )
  }
}

export default Map