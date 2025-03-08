import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, Lock, Users } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
  userHasAccess?: boolean;
}

export function EventCard({ event, userHasAccess = true }: EventCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden group">
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {event.nftRequired && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" />
            NFT Required
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {event.title}
          </h3>
          <span className="flex-shrink-0 text-sm font-medium text-teal-600 dark:text-teal-400">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span>{formatDate(event.startDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span>{event.location}</span>
          </div>

          {event.attendees > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span>{event.attendees} attending</span>
            </div>
          )}
        </div>

        <Link
          to={`/events/${event.id}`}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            userHasAccess
              ? 'bg-teal-600 text-white hover:bg-teal-700'
              : 'bg-gray-100 dark:bg-dark-hover text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          <Ticket className="w-4 h-4" />
          {userHasAccess ? 'View Event' : 'NFT Required'}
        </Link>
      </div>
    </div>
  );
}