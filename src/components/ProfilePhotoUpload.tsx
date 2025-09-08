import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { uploadService } from '../services/uploadService';

interface ProfilePhotoUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  userId: string;
  disabled?: boolean;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  currentImageUrl,
  onImageUpload,
  userId,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Upload to Supabase
      const { success, url, error: uploadError } = await uploadService.uploadProfilePicture(file, userId);

      if (success && url) {
        onImageUpload(url);
        setPreviewUrl(null);
        URL.revokeObjectURL(preview);
      } else {
        setError(uploadError || 'Upload failed');
        setPreviewUrl(null);
        URL.revokeObjectURL(preview);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onImageUpload('');
    setPreviewUrl(null);
    setError('');
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <Camera className="h-4 w-4 mr-2 text-gray-500" />
        Profile Photo
      </label>

      <div className="flex items-start space-x-4">
        {/* Current/Preview Image */}
        <div className="relative">
          {(currentImageUrl || previewUrl) ? (
            <div className="relative">
              <img
                src={previewUrl || currentImageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
              {!uploading && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || uploading}
          />
          
          <button
            type="button"
            onClick={triggerFileSelect}
            disabled={disabled || uploading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>{currentImageUrl ? 'Change Photo' : 'Upload Photo'}</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Recommended: Square image, max 5MB
            <br />
            Supported formats: JPG, PNG, GIF, WebP
          </p>

          {error && (
            <p className="text-xs text-red-600 mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;