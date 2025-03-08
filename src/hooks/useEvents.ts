import { useState, useEffect } from 'react';
import { Event } from '../types/event';

// Mock data for development
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'NFT Artists Meetup',
    description: 'Join fellow NFT artists for an evening of networking and collaboration.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    startDate: '2024-04-15T18:00:00Z',
    endDate: '2024-04-15T21:00:00Z',
    location: 'San Francisco, CA',
    price: 0,
    category: 'meetup',
    nftRequired: false,
    attendees: 45,
    organizer: {
      id: 'org1',
      name: 'Digital Arts Collective',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    }
  },
  {
    id: '2',
    title: 'Web3 Art Conference 2024',
    description: 'Annual conference exploring the intersection of blockchain and digital art.',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    startDate: '2024-05-20T09:00:00Z',
    endDate: '2024-05-22T17:00:00Z',
    location: 'New York, NY',
    price: 299.99,
    category: 'conference',
    nftRequired: true,
    nftContract: '0x1234...5678',
    nftTokenId: '1',
    attendees: 230,
    maxAttendees: 500,
    organizer: {
      id: 'org2',
      name: 'Web3 Arts Foundation',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  {
    id: '3',
    title: 'Digital Art Workshop',
    description: 'Learn advanced digital art techniques from industry professionals.',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80',
    startDate: '2024-04-28T10:00:00Z',
    endDate: '2024-04-28T16:00:00Z',
    location: 'Los Angeles, CA',
    price: 149.99,
    category: 'workshop',
    nftRequired: false,
    attendees: 28,
    maxAttendees: 30,
    organizer: {
      id: 'org3',
      name: 'Creative Tech Lab',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
    },
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    }
  }
];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (isMounted) {
          setEvents(mockEvents);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load events. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return { events, isLoading, error };
}