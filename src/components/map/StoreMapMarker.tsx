import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Star, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Store as StoreType } from '../../types/store';

interface StoreMapMarkerProps {
  store: StoreType;
  address: {
    street: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

// Create store icon SVG
const storeIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0D9488" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`;

const storeIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(storeIconSvg)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export function StoreMapMarker({ store, address }: StoreMapMarkerProps) {
  return (
    <Marker
      position={[address.coordinates.lat, address.coordinates.lng]}
      icon={storeIcon}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-medium text-gray-900 mb-1">{store.name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span>{store.rating}</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{address.street}, {address.city}, {address.state}</p>
          <Link
            to={`/store/${store.id}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Store className="w-4 h-4" />
            View Store
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}