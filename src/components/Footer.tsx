import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 border-t mt-10">
      <p>© 2025 <span className="font-semibold text-gray-800">{t('header.title')}</span>. {t('footer.allRights')}</p>
      <p className="mt-2">
        {t('footer.craftedWith')} <span className="font-medium text-blue-600">Jagan Behera</span>
      </p>
      <p className="mt-1">
        {t('footer.questions')} <a href="mailto:jaganbehera63@gmail.com" className="text-blue-500 hover:underline">jaganbehera63@gmail.com</a>
      </p>
    </footer>
  );
};

export default Footer;
