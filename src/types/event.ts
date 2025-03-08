export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  category: string;
  nftRequired: boolean;
  nftContract?: string;
  nftTokenId?: string;
  attendees: number;
  maxAttendees?: number;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}