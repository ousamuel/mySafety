import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  maxWidth: "650px",
  maxHeight: "350px",
};

const center = {
  lat: 40.7572067,
  lng: -73.7786969,
};

const GoogleMapsComponent: React.FC<any> = ({ setCoords }) => {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string>("");
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY || "";

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center,
            zoom: 8,
          });

          newMap.addListener("click", (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              const lat = event.latLng.lat();
              const lng = event.latLng.lng();
              setSelected({ lat, lng });
              setCoords([lat, lng]);
              getAddress(lat, lng);
            }
          });

          setMap(newMap);
        }
      })
      .catch((e) => {
        console.error("Error loading Google Maps:", e);
      });
  }, []);

  const getAddress = async (lat: number, lng: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY || "";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted_address);
      } else {
        setAddress("No address found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  useEffect(() => {
    if (map && selected) {
      // Create a new marker
      const newMarker = new google.maps.Marker({
        position: selected,
        map,
      });

      // Update the markers array
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }
  }, [map, selected]);

  const deleteAllMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  return (
    <div className="w-[800px] h-[400px]">
      <p>Selected Address: {address ? address : "___"} </p>
      {/* {selected ? (
        <div>
          {selected["lat"]},{selected["lng"]}
        </div>
      ) : null} */}
      <div ref={mapRef} style={mapContainerStyle} />
      <button onClick={deleteAllMarkers}>Delete All Markers</button>
    </div>
  );
};

export default GoogleMapsComponent;
