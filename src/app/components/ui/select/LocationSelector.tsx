'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, X } from 'lucide-react';
import { api } from '~/trpc/react';

const LocationSelector = () => {
  const [location, setLocation] = useState('Detecting...');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: userProfile } = api.user.getProfile.useQuery();

  // --------------------------------------
  // 1. Load location from user profile (if available)
  // --------------------------------------
  useEffect(() => {
    if (userProfile?.address?.geo) {
      const { lat, lng } = userProfile.address.geo;

      setCoords({ lat, lng });

      // Reverse geocode once to get human-readable address
      (async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
          if (data?.address) {
            const { city, town, village, state, country } = data.address;
            const place = [city || town || village, state, country]
              .filter(Boolean)
              .join(', ');
            setLocation(place || 'N/A');
          } else {
            setLocation('Saved Location');
          }
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
          setLocation('Saved Location');
        }
      })();
    }
  }, [userProfile]);

  // --------------------------------------
  // 2. Manual Fetch (if user taps update)
  // --------------------------------------
  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data?.address) {
            const { city, town, village, state, country } = data.address;
            const place = [city || town || village, state, country]
              .filter(Boolean)
              .join(', ');
            setLocation(place || 'Location found');
          } else {
            setLocation('Unknown location');
          }
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
          setLocation('Failed to get location name');
        }

        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLocation('Location error');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={fetchLocation}>
        <MapPin className="w-4 h-4 text-gray-500" />
        <div className="text-sm">
          <p className="font-medium text-gray-900">{loading ? 'Fetching...' : location}</p>
          <p className="text-gray-500 text-xs">Tap to update location</p>
        </div>
        <ChevronDown
          className="w-4 h-4 text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            if (coords) setModalOpen(true);
          }}
        />
      </div>

      {modalOpen && coords && (
        <div className="fixed inset-0 mt-50 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 border-b font-semibold text-gray-800">Your Location</div>
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.005}%2C${coords.lat - 0.005}%2C${coords.lon + 0.005}%2C${coords.lat + 0.005}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`}
              className="w-full h-64"
              loading="lazy"
            />
            <div className="p-4 text-sm text-gray-500 text-center">
              Lat: {coords.lat.toFixed(4)} | Lng: {coords.lon.toFixed(4)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;
