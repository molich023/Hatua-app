'use client';

import React, { useState, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { getDistanceBetweenCoords, calculatePoints } from '@/lib/odometer';

export default function Odometer({ user }) {
  const [distance, setDistance] = useState(0); // in meters
  const [points, setPoints] = useState(20); // Starting with the 20-point bonus
  const [tracking, setTracking] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lastCoords = useRef(null);

  // Initialize OpenStreetMap (MapLibre)
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Open-source tiles
      center: [36.8219, -1.2921], // Default: Nairobi CBD
      zoom: 13
    });
  }, []);

  const toggleTracking = () => {
    if (!tracking) {
      setTracking(true);
      startLocationWatcher();
    } else {
      setTracking(false);
      navigator.geolocation.clearWatch(watcherId.current);
    }
  };

  const watcherId = useRef(null);

  const startLocationWatcher = () => {
    watcherId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        
        if (lastCoords.current) {
          const delta = getDistanceBetweenCoords(
            lastCoords.current.lat, lastCoords.current.lng,
            latitude, longitude
          );
          
          if (delta > 2) { // Minimum 2m movement to avoid GPS jitter
            setDistance(prev => {
              const newTotal = prev + delta;
              // 10km (10000m) = 10pts -> 1000m = 1pt
              setPoints(20 + Math.floor(newTotal / 1000)); 
              return newTotal;
            });
          }
        }
        
        lastCoords.current = { lat: latitude, lng: longitude };
        map.current.flyTo({ center: [longitude, latitude] });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, distanceFilter: 5 }
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-green-600">
      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-xs uppercase font-bold text-green-700">Umbali (KM)</p>
          <p className="text-2xl font-black">{(distance / 1000).toFixed(2)}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-xs uppercase font-bold text-yellow-700">Hatua Points</p>
          <p className="text-2xl font-black">{points}</p>
        </div>
      </div>

      <div ref={mapContainer} className="h-64 w-full rounded-lg mb-4 border" />

      <button 
        onClick={toggleTracking}
        className={`w-full py-4 rounded-full font-bold text-white transition-all ${
          tracking ? 'bg-red-500' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {tracking ? 'ACHA KUFUATILIA' : 'ANZA SAFARI'}
      </button>
    </div>
  );
}
