import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  onCloseMenu?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onCloseMenu }) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'od', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  ];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setOpen(false);
    onCloseMenu?.();
  };

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span>{languages.find((l) => l.code === language)?.nativeName}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code as Language)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                  language === lang.code
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{lang.nativeName}</span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
