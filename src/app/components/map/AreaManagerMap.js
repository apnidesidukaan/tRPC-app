'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const AreaManagerMap = ({ areaManagers }) => {
  const defaultPosition = [26.8467, 80.9462]; // Coordinates for Lucknow
  const defaultZoom = 12; // Adjust zoom level for better focus on Lucknow

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow">
      <MapContainer
        center={defaultPosition}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {areaManagers?.map((manager, index) => (
          <Marker key={index} position={[manager.latitude, manager.longitude]}>
            <Popup>
              <div>
                <strong>{manager.name}</strong><br />
                {manager.city}, {manager.state}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AreaManagerMap;