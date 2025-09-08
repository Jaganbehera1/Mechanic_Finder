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
  profileImageUrl?: string;
  skills?: string[];
  socialLinks?: {
    website?: string;
    linkedin?: string;
    instagram?: string;
  };
  latitude?: number;
  longitude?: number;
  profileCompletionPercentage?: number;
  lastLogin?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  isFeatured?: boolean;
  portfolioImages?: string[];
}

export interface MechanicReview {
  id: string;
  mechanicId: string;
  customerName: string;
  customerEmail?: string;
  rating: number;
  reviewText?: string;
  workCategory?: string;
  createdAt: string;
}

export interface SearchFilters {
  category: string;
  state: string;
  district: string;
  maxCost: number;
  minRating: number;
}

export const MECHANIC_CATEGORIES = [
  'AI/ML Engineer',
  'Architect',
  'Barber',
  'Beautician',
  'Carpenter',
  'Cleaner',
  'Cloud Engineer',
  'Construction Worker',
  'Cook',
  'Cybersecurity Specialist',
  'Data Scientist',
  'Delivery Boy',
  'Driver',
  'Electrician',
  'Embedded Systems Engineer',
  'Event Planner',
  'Gardener',
  'Heavy Machinery Operator',
  'House Painter',
  'Housekeeping',
  'Interior Designer',
  'IoT Automation',
  'IT Support',
  'Mason',
  'Mechanic (Auto)',
  'Mobile App Developer',
  'Nanny/Caretaker',
  'Network Engineer',
  'Photographer',
  'Plumber',
  'Sales Executive',
  'Security Guard',
  'Shopkeeper',
  'Software Engineer',
  'Tailor',
  'Tile Worker',
  'Truck Mechanic',
  'Two-Wheeler Mechanic',
  'Web Developer',
  'Welder',
  'Other'
];