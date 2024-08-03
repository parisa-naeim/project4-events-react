const MAP_BOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = MAP_BOX_API_KEY;

const MapComponent = ({ postcode }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [144.9844, -37.8382], // initial map center in [lng, lat]
      zoom: 11, // initial map zoom
      interactive: false, // disable map interaction
    });

    // Disable zoom and rotation controls
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.dragRotate.disable();
    map.dragPan.disable();
    map.keyboard.disable();
    map.touchZoomRotate.disable();

    const updateMap = async (postcode) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxgl.accessToken}`,
          { params: { country: "AU" } }
        );
        const [lng, lat] = response.data.features[0].center;
        map.setCenter([lng, lat]);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    if (postcode) {
      updateMap(postcode);
    }

    return () => map.remove();
  }, [postcode]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "400px",
        height: "300px",
        border: "1px solid #dfdedb",
        borderRadius: "0.5em",
      }}
    />
  );
};

export default MapComponent;
