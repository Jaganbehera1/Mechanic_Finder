import { supabase } from '../lib/supabase';
import { Mechanic } from '../types/mechanic';

export const mechanicService = {
  // Get all mechanics (public access)
  async getAllMechanics(): Promise<Mechanic[]> {
    const { data, error } = await supabase
      .from('mechanics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mechanics:', error);
      return [];
    }

    return data.map(mechanic => ({
      id: mechanic.id,
      user_id: mechanic.user_id,
      username: mechanic.username,
      name: mechanic.name,
      category: mechanic.category,
      state: mechanic.state,
      district: mechanic.district,
      village: mechanic.village,
      perDayCost: mechanic.per_day_cost,
      contactNumber: mechanic.contact_number,
      email: mechanic.email,
      experience: mechanic.experience,
      description: mechanic.description,
      availability: mechanic.availability,
      rating: mechanic.rating,
      completedJobs: mechanic.completed_jobs,
      joinedDate: mechanic.created_at.split('T')[0],
    }));
  },

  // Get mechanic by user ID
  async getMechanicByUserId(userId: string): Promise<Mechanic | null> {
    const { data, error } = await supabase
      .from('mechanics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching mechanic:', error);
      return null;
    }

    return {
      id: data.id,
      user_id: data.user_id,
      username: data.username,
      name: data.name,
      category: data.category,
      state: data.state,
      district: data.district,
      village: data.village,
      perDayCost: data.per_day_cost,
      contactNumber: data.contact_number,
      email: data.email,
      experience: data.experience,
      description: data.description,
      availability: data.availability,
      rating: data.rating,
      completedJobs: data.completed_jobs,
      joinedDate: data.created_at.split('T')[0],
    };
  },

  // Create new mechanic profile
  async createMechanic(mechanicData: Omit<Mechanic, 'id' | 'joinedDate' | 'rating' | 'completedJobs'> & { user_id: string }): Promise<{ success: boolean; error?: string }> {
    const { data, error } = await supabase
      .from('mechanics')
      .insert({
        user_id: mechanicData.user_id,
        username: mechanicData.username!,
        name: mechanicData.name,
        category: mechanicData.category,
        state: mechanicData.state,
        district: mechanicData.district,
        village: mechanicData.village,
        per_day_cost: mechanicData.perDayCost,
        contact_number: mechanicData.contactNumber,
        email: mechanicData.email,
        experience: mechanicData.experience,
        description: mechanicData.description,
        availability: mechanicData.availability,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating mechanic:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Update mechanic profile
  async updateMechanic(userId: string, updates: Partial<Omit<Mechanic, 'id' | 'user_id' | 'joinedDate'>>): Promise<{ success: boolean; error?: string }> {
    const updateData: any = {};
    
    if (updates.username) updateData.username = updates.username;
    if (updates.name) updateData.name = updates.name;
    if (updates.category) updateData.category = updates.category;
    if (updates.state) updateData.state = updates.state;
    if (updates.district) updateData.district = updates.district;
    if (updates.village) updateData.village = updates.village;
    if (updates.perDayCost) updateData.per_day_cost = updates.perDayCost;
    if (updates.contactNumber) updateData.contact_number = updates.contactNumber;
    if (updates.email) updateData.email = updates.email;
    if (updates.experience !== undefined) updateData.experience = updates.experience;
    if (updates.description) updateData.description = updates.description;
    if (updates.availability) updateData.availability = updates.availability;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.completedJobs !== undefined) updateData.completed_jobs = updates.completedJobs;

    const { error } = await supabase
      .from('mechanics')
      .update(updateData)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating mechanic:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Update mechanic rating
  async updateRating(mechanicId: string, rating: number): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('mechanics')
      .update({ rating })
      .eq('id', mechanicId);

    if (error) {
      console.error('Error updating rating:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Check if username is available
  async isUsernameAvailable(username: string, excludeUserId?: string): Promise<boolean> {
    let query = supabase
      .from('mechanics')
      .select('username')
      .eq('username', username);

    if (excludeUserId) {
      query = query.neq('user_id', excludeUserId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error checking username:', error);
      return false;
    }

    return data.length === 0;
  },
};