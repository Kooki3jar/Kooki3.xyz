import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useLocation } from 'react-router-dom';
import { stores } from '../../data/stores';
import { storeAddresses } from '../../data/storeAddresses';
import { useEvents } from '../../hooks/useEvents';
import { MapHeader } from './MapHeader';
import { EventMapMarker } from './EventMapMarker';
import { StoreMapMarker } from './StoreMapMarker';
import 'leaflet/dist/leaflet.css';

export function MapView() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showEvents, setShowEvents] = useState(location.state?.source === 'events' || true);
  const [showBusinesses, setShowBusinesses] = useState(location.state?.source === 'businesses' || true);
  const { events, isLoading } = useEvents();

  const center: [number, number] = [39.8283, -98.5795]; // Center of US
  const zoom = 4;

  // Initialize visibility based on navigation source
  useEffect(() => {
    if (location.state?.source === 'events') {
      setShowEvents(true);
      setShowBusinesses(false);
    } else if (location.state?.source === 'businesses') {
      setShowEvents(false);
      setShowBusinesses(true);
    }
  }, [location]);

  const filteredStores = useMemo(() => {
    return Object.entries(storeAddresses).filter(([id, _]) => {
      const store = stores.find(s => s.id === Number(id));
      if (!store) return false;
      
      return store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             store.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const storeMarkers = useMemo(() => {
    if (!showBusinesses) return [];

    return filteredStores.map(([id, address]) => {
      const store = stores.find(s => s.id === Number(id));
      if (!store || !address.coordinates) return null;

      return (
        <StoreMapMarker
          key={id}
          store={store}
          address={address}
        />
      );
    }).filter(Boolean);
  }, [showBusinesses, filteredStores]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [events, searchQuery]);

  const eventMarkers = useMemo(() => {
    if (!showEvents) return [];
    return filteredEvents
      .filter(event => event.coordinates)
      .map(event => (
        <EventMapMarker key={event.id} event={event} />
      ));
  }, [showEvents, filteredEvents]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MapHeader
        showEvents={showEvents}
        showBusinesses={showBusinesses}
        searchQuery={searchQuery}
        onToggleEvents={() => setShowEvents(!showEvents)}
        onToggleBusinesses={() => setShowBusinesses(!showBusinesses)}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={zoom}
          className="w-full h-[calc(100vh-64px)]"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
          >
            {storeMarkers}
            {eventMarkers}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}