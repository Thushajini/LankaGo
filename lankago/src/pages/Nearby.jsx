import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

export default function NearbyMapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  // Load Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_REAL_API_KEY", // 🔴 IMPORTANT
    libraries,
  });

  // 📍 1. Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  // 📍 2. Fetch nearby places
  const fetchPlaces = (map, location) => {
    if (!window.google) return;

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: location,
      radius: 3000, // 3km
      type: ["restaurant", "tourist_attraction", "hospital"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results || []);
      }
    });
  };

  // 📍 3. Map load event
  const onMapLoad = (map) => {
    if (userLocation) {
      fetchPlaces(map, userLocation);
    }
  };

  if (!isLoaded) return <p>Loading Map...</p>;
  if (!userLocation) return <p>Getting Location...</p>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <GoogleMap
        center={userLocation}
        zoom={14}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={onMapLoad}
      >
        {/* 🔵 User Location Marker */}
        <Marker position={userLocation} label="You" />

        {/* 📍 Nearby Places Markers */}
        {places.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
}