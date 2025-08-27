import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, UserPlus, Search, LogIn, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <Wrench className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{t('header.title')}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                {!user && (
                  <>
                    <Link
                      to="/"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <Search className="h-4 w-4" />
                      <span>{t('header.findMechanics')}</span>
                    </Link>

                    <Link
                      to="/register"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/register')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>{t('header.registerMechanic')}</span>
                    </Link>

                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>{t('header.mechanicLogin')}</span>
                    </button>
                  </>
                )}

                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/dashboard')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="h-4 w-4" />
                      <span>{t('header.dashboard')}</span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('header.signOut')}</span>
                    </button>
                  </>
                )}
              </nav>
              
              {/* Language Selector */}
              <LanguageSelector />
            </div>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            </div>
          </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-4 space-y-2 border-t border-gray-200">
            {!user && (
              <>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-center px-3 py-2 rounded-md text-sm font-bold ${
                    isActive('/')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t('header.findMechanics')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-center px-3 py-2 rounded-md text-sm font-bold ${
                    isActive('/register')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t('header.registerMechanic')}
                </Link>
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center px-3 py-2 rounded-md text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  {t('header.mechanicLogin')}
                </button>
              </>
            )}

            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-center px-3 py-2 rounded-md text-sm font-bold ${
                    isActive('/dashboard')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t('header.dashboard')}
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center px-3 py-2 rounded-md text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  {t('header.signOut')}
                </button>
              </>
            )}
            
            {/* Mobile Language Selector */}
            <div className="pt-2 border-t border-gray-200">
              <LanguageSelector />
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        // onSuccess={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;