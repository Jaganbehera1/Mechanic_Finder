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
      profileImageUrl: mechanic.profile_image_url,
      skills: mechanic.skills,
      socialLinks: mechanic.social_links,
      latitude: mechanic.latitude,
      longitude: mechanic.longitude,
      profileCompletionPercentage: mechanic.profile_completion_percentage,
      lastLogin: mechanic.last_login,
      emailVerified: mechanic.email_verified,
      phoneVerified: mechanic.phone_verified,
      isFeatured: mechanic.is_featured,
      portfolioImages: mechanic.portfolio_images,
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
      profileImageUrl: data.profile_image_url,
      skills: data.skills,
      socialLinks: data.social_links,
      latitude: data.latitude,
      longitude: data.longitude,
      profileCompletionPercentage: data.profile_completion_percentage,
      lastLogin: data.last_login,
      emailVerified: data.email_verified,
      phoneVerified: data.phone_verified,
      isFeatured: data.is_featured,
      portfolioImages: data.portfolio_images,
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
        skills: mechanicData.skills || [],
        social_links: mechanicData.socialLinks || {},
        profile_image_url: mechanicData.profileImageUrl,
        email_verified: false,
        phone_verified: false,
        is_featured: false,
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
    if (updates.skills) updateData.skills = updates.skills;
    if (updates.socialLinks) updateData.social_links = updates.socialLinks;
    if (updates.profileImageUrl !== undefined) updateData.profile_image_url = updates.profileImageUrl;
    if (updates.emailVerified !== undefined) updateData.email_verified = updates.emailVerified;
    if (updates.phoneVerified !== undefined) updateData.phone_verified = updates.phoneVerified;

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

  // Add review for mechanic
  async addReview(mechanicId: string, customerName: string, rating: number, reviewText?: string, customerEmail?: string, workCategory?: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('mechanic_reviews')
      .insert({
        mechanic_id: mechanicId,
        customer_name: customerName,
        customer_email: customerEmail,
        rating,
        review_text: reviewText,
        work_category: workCategory,
      });

    if (error) {
      console.error('Error adding review:', error);
      return { success: false, error: error.message };
    }

    // Update mechanic's average rating
    const { data: reviews } = await supabase
      .from('mechanic_reviews')
      .select('rating')
      .eq('mechanic_id', mechanicId);

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      await supabase
        .from('mechanics')
        .update({ rating: Math.round(avgRating * 10) / 10 })
        .eq('id', mechanicId);
    }

    return { success: true };
  },

  // Get reviews for mechanic
  async getReviews(mechanicId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('mechanic_reviews')
      .select('*')
      .eq('mechanic_id', mechanicId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return data || [];
  },

  // Toggle favorite mechanic
  async toggleFavorite(userEmail: string, mechanicId: string): Promise<{ success: boolean; isFavorite: boolean }> {
    // Check if already favorited
    const { data: existing } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_email', userEmail)
      .eq('mechanic_id', mechanicId)
      .single();

    if (existing) {
      // Remove from favorites
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_email', userEmail)
        .eq('mechanic_id', mechanicId);

      return { success: !error, isFavorite: false };
    } else {
      // Add to favorites
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_email: userEmail,
          mechanic_id: mechanicId,
        });

      return { success: !error, isFavorite: true };
    }
  },

  // Get user's favorite mechanics
  async getFavorites(userEmail: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('mechanic_id')
      .eq('user_email', userEmail);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    return data.map(fav => fav.mechanic_id);
  },
};