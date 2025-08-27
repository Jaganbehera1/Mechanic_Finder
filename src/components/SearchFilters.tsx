import React from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters as Filters, MECHANIC_CATEGORIES } from '../types/mechanic';
import { getStates, getDistrictsByState } from '../data/indianStatesDistricts';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange }) => {
  const { t } = useLanguage();
  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset district when state changes
    if (key === 'state') {
      newFilters.district = '';
    }
    
    onFiltersChange(newFilters);
  };

  const availableDistricts = filters.state ? getDistrictsByState(filters.state) : [];

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      state: '',
      district: '',
      maxCost: 0,
      minRating: 0
    });
  };

  const hasActiveFilters = filters.category || filters.state || filters.district || filters.maxCost > 0 || filters.minRating > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">{t('filters.searchFilter')}</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span>{t('filters.clearFilters')}</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.category')}
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('filters.allCategories')}</option>
            {MECHANIC_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.state')}
          </label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('filters.allStates')}</option>
            {getStates().map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.district')}
          </label>
          <select
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!filters.state}
          >
            <option value="">{t('filters.allDistricts')}</option>
            {availableDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.maxDailyCost')}
          </label>
          <input
            type="number"
            value={filters.maxCost || ''}
            onChange={(e) => handleFilterChange('maxCost', parseInt(e.target.value) || 0)}
            placeholder={t('filters.enterAmount')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.minRating')}
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={0}>{t('filters.anyRating')}</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4.0}>4.0+ Stars</option>
            <option value={3.5}>3.5+ Stars</option>
            <option value={3.0}>3.0+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;