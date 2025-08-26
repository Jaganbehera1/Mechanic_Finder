import React, { useState, useEffect, useMemo } from 'react';
import { Users, MapPin, IndianRupee } from 'lucide-react';
import { Mechanic, SearchFilters as SearchFiltersType } from '../types/mechanic';
import MechanicCard from '../components/MechanicCard';
import SearchFilters from '../components/SearchFilters';
import { mechanicService } from '../services/mechanicService';

const HomePage: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFiltersType>({
    category: '',
    state: '',
    district: '',
    maxCost: 0,
    minRating: 0
  });

  useEffect(() => {
    loadMechanics();
  }, []);

  const loadMechanics = async () => {
    try {
      const mechanicsData = await mechanicService.getAllMechanics();
      setMechanics(mechanicsData);
    } catch (error) {
      console.error('Error loading mechanics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (mechanicId: string, rating: number) => {
    mechanicService.updateRating(mechanicId, rating);
    // Update local state
    setMechanics(prev => prev.map(mechanic => 
      mechanic.id === mechanicId ? { ...mechanic, rating } : mechanic
    ));
  };

  const filteredMechanics = useMemo(() => {
    return mechanics.filter(mechanic => {
      const matchesCategory = !filters.category || mechanic.category === filters.category;
      const matchesState = !filters.state || mechanic.state === filters.state;
      const matchesDistrict = !filters.district || mechanic.district === filters.district;
      const matchesCost = !filters.maxCost || mechanic.perDayCost <= filters.maxCost;
      const matchesRating = mechanic.rating >= filters.minRating;
      
      return matchesCategory && matchesState && matchesDistrict && matchesCost && matchesRating;
    });
  }, [mechanics, filters]);

  const stats = useMemo(() => {
    const totalMechanics = mechanics.length;
    const availableMechanics = mechanics.filter(m => m.availability === 'available').length;
    const avgCost = mechanics.length > 0 
      ? Math.round(mechanics.reduce((sum, m) => sum + m.perDayCost, 0) / mechanics.length)
      : 0;
    
    return { totalMechanics, availableMechanics, avgCost };
  }, [mechanics]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Right Professional
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Connect with skilled mechanics, craftsmen, and service professionals in your area
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold">{stats.totalMechanics}</div>
              <div className="text-blue-200">Total Professionals</div>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold">{stats.availableMechanics}</div>
              <div className="text-blue-200">Available Now</div>
            </div>
            <div className="text-center">
              <IndianRupee className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold">₹{stats.avgCost.toLocaleString('en-IN')}</div>
              <div className="text-blue-200">Average Daily Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Results */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Professionals ({filteredMechanics.length})
          </h2>
        </div>

        {filteredMechanics.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600">Try adjusting your search filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMechanics.map(mechanic => (
              <MechanicCard key={mechanic.id} mechanic={mechanic} onRate={handleRating} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;