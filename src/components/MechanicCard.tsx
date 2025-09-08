import React, { useState } from 'react';
import { Phone, Mail, MapPin, Star, Calendar, Briefcase, Heart, ExternalLink, Award, MessageSquare } from 'lucide-react';
import { Mechanic } from '../types/mechanic';
import { useLanguage } from '../contexts/LanguageContext';
import ReviewModal from './ReviewModal';

interface MechanicCardProps {
  mechanic: Mechanic;
  onRate?: (mechanicId: string, rating: number) => void;
  onFavorite?: (mechanicId: string) => void;
  isFavorite?: boolean;
  onReviewAdded?: () => void;
}

const MechanicCard: React.FC<MechanicCardProps> = ({ 
  mechanic, 
  onRate, 
  onFavorite, 
  isFavorite, 
  onReviewAdded 
}) => {
  const { t } = useLanguage();
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return t('card.available');
      case 'busy':
        return t('card.busy');
      case 'unavailable':
        return t('card.unavailable');
      default:
        return t('card.unavailable');
    }
  };

  const handleRating = (rating: number) => {
    if (onRate) {
      onRate(mechanic.id, rating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => handleRating(i)}
          className="focus:outline-none hover:scale-110 transition-transform"
          disabled={!onRate}
        >
          <Star
            className={`h-4 w-4 ${
              i <= mechanic.rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            } ${onRate ? 'cursor-pointer' : ''}`}
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Profile Image */}
      {mechanic.profileImageUrl && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={mechanic.profileImageUrl}
            alt={mechanic.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{mechanic.name}</h3>
            <p className="text-blue-600 font-medium">{mechanic.category}</p>
            <div className="flex items-center space-x-2 mt-1">
              {mechanic.emailVerified && (
                <div className="flex items-center">
                  <Mail className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">Email ✓</span>
                </div>
              )}
              {mechanic.phoneVerified && (
                <div className="flex items-center">
                  <Phone className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">Phone ✓</span>
                </div>
              )}
              {mechanic.isFeatured && (
                <div className="flex items-center">
                  <Award className="h-3 w-3 text-yellow-600 mr-1" />
                  <span className="text-xs text-yellow-600 font-medium">Featured</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {onFavorite && (
              <button
                onClick={() => onFavorite(mechanic.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(mechanic.availability)}`}>
              {getAvailabilityText(mechanic.availability)}
            </span>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1 mb-1">
                {renderStars()}
              </div>
              <span className="text-xs text-gray-600">
                {mechanic.rating > 0 ? `${mechanic.rating.toFixed(1)} ${t('card.stars')}` : t('card.noRatings')}
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {mechanic.skills && mechanic.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {mechanic.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {mechanic.skills.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                  +{mechanic.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-800">{mechanic.village}</div>
              <div className="text-xs text-gray-500">{mechanic.district}, {mechanic.state}</div>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{mechanic.contactNumber}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{mechanic.email}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{mechanic.experience} {t('card.yearsExp')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{mechanic.completedJobs} {t('card.jobs')}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mechanic.description}</p>

        {/* Social Links */}
        {mechanic.socialLinks && Object.values(mechanic.socialLinks).some(link => link) && (
          <div className="flex space-x-2 mb-4">
            {mechanic.socialLinks.website && (
              <a
                href={mechanic.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {mechanic.socialLinks.linkedin && (
              <a
                href={mechanic.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {mechanic.socialLinks.instagram && (
              <a
                href={mechanic.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">₹{mechanic.perDayCost.toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-500">{t('card.perDay')}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Review</span>
            </button>
            <a
              href={`tel:${mechanic.contactNumber}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-block text-center"
            >
              {t('card.contact')}
            </a>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        mechanicId={mechanic.id}
        mechanicName={mechanic.name}
        onReviewAdded={() => {
          onReviewAdded?.();
          setShowReviewModal(false);
        }}
      />
    </div>
  );
};

export default MechanicCard;