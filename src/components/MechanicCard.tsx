import React from 'react';
import { Phone, Mail, MapPin, Star, Calendar, Briefcase } from 'lucide-react';
import { Mechanic } from '../types/mechanic';
import { useLanguage } from '../contexts/LanguageContext';

interface MechanicCardProps {
  mechanic: Mechanic;
  onRate?: (mechanicId: string, rating: number) => void;
}

const MechanicCard: React.FC<MechanicCardProps> = ({ mechanic, onRate }) => {
  const { t } = useLanguage();
  
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
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{mechanic.name}</h3>
            <p className="text-blue-600 font-medium">{mechanic.category}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
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

        <div className="flex justify-between items-center">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">₹{mechanic.perDayCost.toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-500">{t('card.perDay')}</p>
          </div>
          <a
            href={`tel:${mechanic.contactNumber}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-block text-center"
          >
            {t('card.contact')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MechanicCard;