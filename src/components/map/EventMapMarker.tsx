import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/date';

interface EventMapMarkerProps {
  event: Event;
}

// Create event icon using a simple colored marker
const eventIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMGQ5NDg4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIxIDEwYzAgNy05IDEzLTkgMTNzLTktNi05LTEzYTkgOSAwIDAgMSAxOCAweiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiPjwvY2lyY2xlPjwvc3ZnPg==',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export function EventMapMarker({ event }: EventMapMarkerProps) {
  if (!event.coordinates) return null;

  return (
    <Marker
      position={[event.coordinates.lat, event.coordinates.lng]}
      icon={eventIcon}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{event.attendees} attending</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Ticket className="w-4 h-4" />
              <span>{event.price === 0 ? 'Free' : `$${event.price}`}</span>
            </div>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            View Event
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}