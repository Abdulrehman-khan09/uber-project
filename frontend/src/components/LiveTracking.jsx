import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LiveTracking = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [location, setLocation] = useState({ lat: 33.6139, lng: 73.1438 });

  useEffect(() => {
    if (!mapContainer.current) return;

    // 1. Initialize the map and disable the default attributionControl
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "/style.json",
      center: [location.lng, location.lat],
      zoom: 12,
      attributionControl: false, // Removes default MapLibre logo & attribution
    });

    // 2. Add a marker at the initial location
    markerRef.current = new maplibregl.Marker()
      .setLngLat([location.lng, location.lat])
      .addTo(mapRef.current);

    // 3. Watch for geolocation updates
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(newLocation);

          // Update marker & center
          markerRef.current.setLngLat([newLocation.lng, newLocation.lat]);
          mapRef.current.setCenter([newLocation.lng, newLocation.lat]);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by your browser.");
    }

    // 4. Once the map has loaded, add the OSM attribution
    mapRef.current.on("load", () => {
      const osmAttribution = document.createElement("div");
      osmAttribution.style.cssText =
        "padding: 5px; background: rgba(255, 255, 255, 0.8); font-size: 12px;";
      osmAttribution.innerHTML = "© OpenStreetMap contributors";

      mapRef.current.addControl(
        {
          onAdd: function () {
            this._container = osmAttribution;
            return this._container;
          },
          onRemove: function () {
            this._container.parentNode.removeChild(this._container);
          },
        },
        "bottom-right"
      );
    });

    // 5. Cleanup when component unmounts
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default LiveTracking;
