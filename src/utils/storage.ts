import { Mechanic } from '../types/mechanic';

const MECHANICS_STORAGE_KEY = 'mechanics_data';

export const loadMechanics = (): Mechanic[] => {
  try {
    const stored = localStorage.getItem(MECHANICS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading mechanics from storage:', error);
  }
  return [];
};

export const saveMechanics = (mechanics: Mechanic[]): void => {
  try {
    localStorage.setItem(MECHANICS_STORAGE_KEY, JSON.stringify(mechanics));
  } catch (error) {
    console.error('Error saving mechanics to storage:', error);
  }
};

export const addMechanic = (mechanic: Mechanic): void => {
  const mechanics = loadMechanics();
  mechanics.push(mechanic);
  saveMechanics(mechanics);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const existing = loadMechanics();
  if (existing.length === 0) {
    const sampleMechanics: Mechanic[] = [
      {
        id: generateId(),
        name: 'John Smith',
        category: 'Carpenter',
        state: 'Maharashtra',
        district: 'Mumbai',
        village: 'Andheri West',
        perDayCost: 2500,
        contactNumber: '+91-9876543210',
        email: 'john@example.com',
        experience: 5,
        description: 'Experienced carpenter specializing in custom furniture and home renovations.',
        availability: 'available',
        rating: 4.8,
        completedJobs: 127,
        joinedDate: '2024-01-15'
      },
      {
        id: generateId(),
        name: 'Sarah Johnson',
        category: 'Plumber',
        state: 'Delhi',
        district: 'Delhi',
        village: 'Connaught Place',
        perDayCost: 2000,
        contactNumber: '+91-9876543211',
        email: 'sarah@example.com',
        experience: 8,
        description: 'Licensed plumber with expertise in residential and commercial plumbing systems.',
        availability: 'available',
        rating: 4.9,
        completedJobs: 203,
        joinedDate: '2023-03-10'
      },
      {
        id: generateId(),
        name: 'Mike Davis',
        category: 'Electrician',
        state: 'Karnataka',
        district: 'Bangalore',
        village: 'Koramangala',
        perDayCost: 3000,
        contactNumber: '+91-9876543212',
        email: 'mike@example.com',
        experience: 10,
        description: 'Master electrician offering residential and commercial electrical services.',
        availability: 'busy',
        rating: 4.7,
        completedJobs: 289,
        joinedDate: '2023-08-22'
      },
      {
        id: generateId(),
        name: 'Alex Chen',
        category: 'Software Engineer',
        state: 'Telangana',
        district: 'Hyderabad',
        village: 'HITEC City',
        perDayCost: 5000,
        contactNumber: '+91-9876543213',
        email: 'alex@example.com',
        experience: 6,
        description: 'Full-stack developer specializing in React, Node.js, and cloud solutions.',
        availability: 'available',
        rating: 4.9,
        completedJobs: 85,
        joinedDate: '2024-06-01'
      }
    ];
    saveMechanics(sampleMechanics);
  }
};