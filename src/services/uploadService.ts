import { supabase } from '../lib/supabase';

export const uploadService = {
  // Upload profile picture and return public URL
  async uploadProfilePicture(file: File, userId: string): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return { success: false, error: 'Please select an image file' };
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return { success: false, error: 'File size must be less than 5MB' };
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
      }

      // Get public URL
      // Generate signed URL (valid for 1 hour)
      const { data: signedData, error: signedError } = await supabase.storage
        .from('profile-pictures')
        .createSignedUrl(filePath, 3600); // 3600 = 1 hour in seconds

      if (signedError) {
        console.error('Signed URL error:', signedError);
        return { success: false, error: signedError.message };
      }
      
    return { success: true, url: signedData.signedUrl };

    } catch (error) {
      console.error('Upload service error:', error);
      return { success: false, error: 'Failed to upload image' };
    }
  },

  // Delete profile picture
  async deleteProfilePicture(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.storage
        .from('profile-pictures')
        .remove([filePath]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Delete service error:', error);
      return { success: false, error: 'Failed to delete image' };
    }
  },

  // Extract file path from URL for deletion
  getFilePathFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
};