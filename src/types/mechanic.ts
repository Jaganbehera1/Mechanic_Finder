export interface Mechanic {
  id: string;
  user_id?: string;
  username?: string;
  name: string;
  category: string;
  state: string;
  district: string;
  village: string;
  perDayCost: number;
  contactNumber: string;
  email: string;
  experience: number;
  description: string;
  availability: 'available' | 'busy' | 'unavailable';
  rating: number;
  completedJobs: number;
  joinedDate: string;
}

export interface SearchFilters {
  category: string;
  state: string;
  district: string;
  maxCost: number;
  minRating: number;
}

export const MECHANIC_CATEGORIES = [
  'Carpenter',
  'Plumber',
  'Electrician',
  'Software Engineer',
  'House Painter',
  'Mechanic (Auto)',
  'Welder',
  'Tile Worker',
  'Gardener',
  'Cleaner',
  'Other'
];