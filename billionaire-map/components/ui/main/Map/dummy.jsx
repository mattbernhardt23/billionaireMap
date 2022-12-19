import Head from "next/head";
import {useState, useEffect, useCallback} from 'react'
import { useSelector } from 'react-redux';
import { initializeMap, addDataLayer } from '@components/map';
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

 
 
export default function Map() {
  const { billionaires } = useSelector((state) => state.billionaireData)
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhld2Jlcm5oYXJkdCIsImEiOiJjbDYzejZpaGYwaGg1M2tsdmViOW05Zmw1In0.ILKwMbc0ahbTlF9HvQeGyQ'

  let map 

  useEffect(() => {
    setPageIsMounted(true);

  let map = new mapboxgl.Map({
    container: "my-map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-97.02, 38.887],
    zoom: 3,
    pitch: 25,
  });

  initializeMap(mapboxgl, map);
    setMap(map);

  }, []);

  useEffect(() => {
    if (pageIsMounted && billionaires) {
      // Map.on("load", function () {
      //   addDataLayer(Map, billionaires);
      // });
     
      Map.on("load", function () {
      billionaires.map((billionaire) => {
        let coordinates = [billionaire.geoLocation.lng, billionaire.geoLocation.lat]
        var marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${billionaire.person.name}</h3>
              <p>${billionaire.finalworth}</p>`
            )
        )
        .addTo(Map)
      })
    })
    }
  }, [pageIsMounted, setMap, billionaires, Map]);

  return (
    <>
      <div>
        <Head>
        <title>Billionaire Map</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <main className="flex flex-1 flex-col justify-center items-center p-5">
        <div 
          id="my-map" 
          style={{ height: 500, width: 750 }} 
        />
      </main>
      </div>
    </>
  )
     
}