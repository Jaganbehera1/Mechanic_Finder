import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'od';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'MechFinder',
    'header.findMechanics': 'Find Mechanics',
    'header.registerMechanic': 'Register as Mechanic',
    'header.mechanicLogin': 'Mechanic Login',
    'header.dashboard': 'Dashboard',
    'header.signOut': 'Sign Out',

    // Home Page
    'home.heroTitle': 'Find the Right Professional',
    'home.heroSubtitle': 'Connect with skilled mechanics, craftsmen, and service professionals in your area',
    'home.totalProfessionals': 'Total Professionals',
    'home.availableNow': 'Available Now',
    'home.averageDailyRate': 'Average Daily Rate',
    'home.availableProfessionals': 'Available Professionals',
    'home.noProfessionalsFound': 'No professionals found',
    'home.adjustFilters': 'Try adjusting your search filters to see more results.',

    // Search Filters
    'filters.searchFilter': 'Search & Filter',
    'filters.clearFilters': 'Clear Filters',
    'filters.category': 'Category',
    'filters.allCategories': 'All Categories',
    'filters.state': 'State',
    'filters.allStates': 'All States',
    'filters.district': 'District',
    'filters.allDistricts': 'All Districts',
    'filters.maxDailyCost': 'Max Daily Cost (₹)',
    'filters.enterAmount': 'Enter amount in ₹',
    'filters.minRating': 'Min Rating',
    'filters.anyRating': 'Any Rating',

    // Mechanic Card
    'card.available': 'Available',
    'card.busy': 'Busy',
    'card.unavailable': 'Unavailable',
    'card.noRatings': 'No ratings yet',
    'card.stars': 'stars',
    'card.yearsExp': 'years exp',
    'card.jobs': 'jobs',
    'card.perDay': 'per day',
    'card.contact': 'Contact',

    // Registration
    'register.title': 'Register as a Professional',
    'register.subtitle': 'Join our network and connect with customers',
    'register.username': 'Username',
    'register.usernamePlaceholder': 'Choose a unique username',
    'register.password': 'Password',
    'register.passwordPlaceholder': 'Create a password',
    'register.confirmPassword': 'Confirm Password',
    'register.confirmPasswordPlaceholder': 'Confirm your password',
    'register.fullName': 'Full Name',
    'register.fullNamePlaceholder': 'Enter your full name',
    'register.category': 'Professional Category',
    'register.selectProfession': 'Select your profession',
    'register.state': 'State',
    'register.selectState': 'Select your state',
    'register.district': 'District',
    'register.selectDistrict': 'Select your district',
    'register.village': 'Village/Area',
    'register.villagePlaceholder': 'e.g., Andheri West, Connaught Place, Koramangala',
    'register.dailyRate': 'Daily Rate (₹)',
    'register.dailyRatePlaceholder': 'Enter your daily rate in ₹',
    'register.contactNumber': 'Contact Number',
    'register.contactPlaceholder': 'XXXXXXXXXX',
    'register.email': 'Email Address',
    'register.emailPlaceholder': 'your@email.com',
    'register.experience': 'Years of Experience',
    'register.experiencePlaceholder': 'Years of experience',
    'register.availability': 'Current Availability',
    'register.description': 'Professional Description',
    'register.descriptionPlaceholder': 'Describe your skills, specializations, and what makes you stand out...',
    'register.cancel': 'Cancel',
    'register.registerProfile': 'Register Profile',
    'register.success': 'Registration Successful!',
    'register.successMessage': 'Your account has been created successfully! Please check your email to verify your account, then you can log in to manage your profile.',
    'register.viewProfessionals': 'View All Professionals',

    // Login Modal
    'login.title': 'Mechanic Login',
    'login.welcomeBack': 'Welcome Back',
    'login.emailAddress': 'Email Address',
    'login.emailPlaceholder': 'Enter your email',
    'login.passwordPlaceholder': 'Enter your password',
    'login.cancel': 'Cancel',
    'login.signIn': 'Sign In',
    'login.signingIn': 'Signing In...',
    'login.loggedIn': 'You are logged in. "Find Mechanics" is hidden.',
    'login.logout': 'Logout',

    // Dashboard
    'dashboard.title': 'Mechanic Dashboard',
    'dashboard.subtitle': 'Manage your professional profile',
    'dashboard.loading': 'Loading your dashboard...',
    'dashboard.noProfile': 'No Profile Found',
    'dashboard.noProfileMessage': 'You don\'t have a mechanic profile yet.',
    'dashboard.createProfile': 'Create Profile',
    'dashboard.profileUpdated': 'Profile updated successfully!',
    'dashboard.saving': 'Saving...',
    'dashboard.saveChanges': 'Save Changes',

    // Footer
    'footer.allRights': 'All rights reserved.',
    'footer.craftedWith': 'Crafted with ❤️ and clean code by',
    'footer.questions': 'Have questions? Reach me at',

    // Validation Messages
    'validation.usernameRequired': 'Username is required',
    'validation.usernameLength': 'Username must be at least 3 characters',
    'validation.passwordRequired': 'Password is required',
    'validation.passwordLength': 'Password must be at least 6 characters',
    'validation.passwordMismatch': 'Passwords do not match',
    'validation.nameRequired': 'Name is required',
    'validation.categoryRequired': 'Category is required',
    'validation.stateRequired': 'State is required',
    'validation.districtRequired': 'District is required',
    'validation.villageRequired': 'Village/Area is required',
    'validation.dailyRateRequired': 'Valid daily rate is required',
    'validation.contactRequired': 'Contact number is required',
    'validation.contactInvalid': 'Please enter a valid 10-digit Indian mobile number',
    'validation.emailRequired': 'Email is required',
    'validation.emailInvalid': 'Valid email is required',
    'validation.experienceRequired': 'Valid experience is required',
    'validation.descriptionRequired': 'Description is required',
    'validation.usernameTaken': 'Username is already taken',

    // Language
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.odia': 'ଓଡ଼ିଆ',
  },
  hi: {
    // Header
    'header.title': 'मैकेनिक फाइंडर',
    'header.findMechanics': 'मैकेनिक खोजें',
    'header.registerMechanic': 'मैकेनिक के रूप में पंजीकरण',
    'header.mechanicLogin': 'मैकेनिक लॉगिन',
    'header.dashboard': 'डैशबोर्ड',
    'header.signOut': 'साइन आउट',

    // Home Page
    'home.heroTitle': 'सही पेशेवर खोजें',
    'home.heroSubtitle': 'अपने क्षेत्र में कुशल मैकेनिक, कारीगर और सेवा पेशेवरों से जुड़ें',
    'home.totalProfessionals': 'कुल पेशेवर',
    'home.availableNow': 'अभी उपलब्ध',
    'home.averageDailyRate': 'औसत दैनिक दर',
    'home.availableProfessionals': 'उपलब्ध पेशेवर',
    'home.noProfessionalsFound': 'कोई पेशेवर नहीं मिला',
    'home.adjustFilters': 'अधिक परिणाम देखने के लिए अपने खोज फिल्टर को समायोजित करने का प्रयास करें।',

    // Search Filters
    'filters.searchFilter': 'खोज और फिल्टर',
    'filters.clearFilters': 'फिल्टर साफ़ करें',
    'filters.category': 'श्रेणी',
    'filters.allCategories': 'सभी श्रेणियां',
    'filters.state': 'राज्य',
    'filters.allStates': 'सभी राज्य',
    'filters.district': 'जिला',
    'filters.allDistricts': 'सभी जिले',
    'filters.maxDailyCost': 'अधिकतम दैनिक लागत (₹)',
    'filters.enterAmount': '₹ में राशि दर्ज करें',
    'filters.minRating': 'न्यूनतम रेटिंग',
    'filters.anyRating': 'कोई भी रेटिंग',

    // Mechanic Card
    'card.available': 'उपलब्ध',
    'card.busy': 'व्यस्त',
    'card.unavailable': 'अनुपलब्ध',
    'card.noRatings': 'अभी तक कोई रेटिंग नहीं',
    'card.stars': 'सितारे',
    'card.yearsExp': 'साल का अनुभव',
    'card.jobs': 'काम',
    'card.perDay': 'प्रति दिन',
    'card.contact': 'संपर्क करें',

    // Registration
    'register.title': 'एक पेशेवर के रूप में पंजीकरण करें',
    'register.subtitle': 'हमारे नेटवर्क में शामिल हों और ग्राहकों से जुड़ें',
    'register.username': 'उपयोगकर्ता नाम',
    'register.usernamePlaceholder': 'एक अनूठा उपयोगकर्ता नाम चुनें',
    'register.password': 'पासवर्ड',
    'register.passwordPlaceholder': 'एक पासवर्ड बनाएं',
    'register.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'register.confirmPasswordPlaceholder': 'अपने पासवर्ड की पुष्टि करें',
    'register.fullName': 'पूरा नाम',
    'register.fullNamePlaceholder': 'अपना पूरा नाम दर्ज करें',
    'register.category': 'पेशेवर श्रेणी',
    'register.selectProfession': 'अपना पेशा चुनें',
    'register.state': 'राज्य',
    'register.selectState': 'अपना राज्य चुनें',
    'register.district': 'जिला',
    'register.selectDistrict': 'अपना जिला चुनें',
    'register.village': 'गांव/क्षेत्र',
    'register.villagePlaceholder': 'जैसे, अंधेरी वेस्ट, कनॉट प्लेस, कोरमंगला',
    'register.dailyRate': 'दैनिक दर (₹)',
    'register.dailyRatePlaceholder': '₹ में अपनी दैनिक दर दर्ज करें',
    'register.contactNumber': 'संपर्क नंबर',
    'register.contactPlaceholder': 'XXXXXXXXXX',
    'register.email': 'ईमेल पता',
    'register.emailPlaceholder': 'your@email.com',
    'register.experience': 'अनुभव के वर्ष',
    'register.experiencePlaceholder': 'अनुभव के वर्ष',
    'register.availability': 'वर्तमान उपलब्धता',
    'register.description': 'पेशेवर विवरण',
    'register.descriptionPlaceholder': 'अपने कौशल, विशेषज्ञता और जो आपको अलग बनाता है उसका वर्णन करें...',
    'register.cancel': 'रद्द करें',
    'register.registerProfile': 'प्रोफाइल पंजीकृत करें',
    'register.success': 'पंजीकरण सफल!',
    'register.successMessage': 'आपका खाता सफलतापूर्वक बनाया गया है! कृपया अपना खाता सत्यापित करने के लिए अपना ईमेल जांचें, फिर आप अपनी प्रोफ़ाइल प्रबंधित करने के लिए लॉग इन कर सकते हैं।',
    'register.viewProfessionals': 'सभी पेशेवर देखें',

    // Login Modal
    'login.title': 'मैकेनिक लॉगिन',
    'login.welcomeBack': 'वापसी पर स्वागत है',
    'login.emailAddress': 'ईमेल पता',
    'login.emailPlaceholder': 'अपना ईमेल दर्ज करें',
    'login.passwordPlaceholder': 'अपना पासवर्ड दर्ज करें',
    'login.cancel': 'रद्द करें',
    'login.signIn': 'साइन इन',
    'login.signingIn': 'साइन इन हो रहा है...',
    'login.loggedIn': 'आप लॉग इन हैं। "मैकेनिक खोजें" छुपा हुआ है।',
    'login.logout': 'लॉगआउट',

    // Dashboard
    'dashboard.title': 'मैकेनिक डैशबोर्ड',
    'dashboard.subtitle': 'अपनी पेशेवर प्रोफ़ाइल प्रबंधित करें',
    'dashboard.loading': 'आपका डैशबोर्ड लोड हो रहा है...',
    'dashboard.noProfile': 'कोई प्रोफाइल नहीं मिली',
    'dashboard.noProfileMessage': 'आपके पास अभी तक कोई मैकेनिक प्रोफाइल नहीं है।',
    'dashboard.createProfile': 'प्रोफाइल बनाएं',
    'dashboard.profileUpdated': 'प्रोफाइल सफलतापूर्वक अपडेट की गई!',
    'dashboard.saving': 'सहेजा जा रहा है...',
    'dashboard.saveChanges': 'परिवर्तन सहेजें',

    // Footer
    'footer.allRights': 'सभी अधिकार सुरक्षित।',
    'footer.craftedWith': '❤️ और साफ कोड के साथ तैयार किया गया',
    'footer.questions': 'कोई प्रश्न? मुझसे संपर्क करें',

    // Validation Messages
    'validation.usernameRequired': 'उपयोगकर्ता नाम आवश्यक है',
    'validation.usernameLength': 'उपयोगकर्ता नाम कम से कम 3 अक्षर का होना चाहिए',
    'validation.passwordRequired': 'पासवर्ड आवश्यक है',
    'validation.passwordLength': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    'validation.passwordMismatch': 'पासवर्ड मेल नहीं खाते',
    'validation.nameRequired': 'नाम आवश्यक है',
    'validation.categoryRequired': 'श्रेणी आवश्यक है',
    'validation.stateRequired': 'राज्य आवश्यक है',
    'validation.districtRequired': 'जिला आवश्यक है',
    'validation.villageRequired': 'गांव/क्षेत्र आवश्यक है',
    'validation.dailyRateRequired': 'वैध दैनिक दर आवश्यक है',
    'validation.contactRequired': 'संपर्क नंबर आवश्यक है',
    'validation.contactInvalid': 'कृपया एक वैध 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें',
    'validation.emailRequired': 'ईमेल आवश्यक है',
    'validation.emailInvalid': 'वैध ईमेल आवश्यक है',
    'validation.experienceRequired': 'वैध अनुभव आवश्यक है',
    'validation.descriptionRequired': 'विवरण आवश्यक है',
    'validation.usernameTaken': 'उपयोगकर्ता नाम पहले से लिया गया है',

    // Language
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.odia': 'ଓଡ଼ିଆ',
  },
  od: {
    // Header
    'header.title': 'ମେକାନିକ ଫାଇଣ୍ଡର',
    'header.findMechanics': 'ମେକାନିକ ଖୋଜନ୍ତୁ',
    'header.registerMechanic': 'ମେକାନିକ ଭାବରେ ପଞ୍ଜୀକରଣ',
    'header.mechanicLogin': 'ମେକାନିକ ଲଗଇନ',
    'header.dashboard': 'ଡ୍ୟାସବୋର୍ଡ',
    'header.signOut': 'ସାଇନ ଆଉଟ',

    // Home Page
    'home.heroTitle': 'ସଠିକ ପେଶାଦାର ଖୋଜନ୍ତୁ',
    'home.heroSubtitle': 'ଆପଣଙ୍କ ଅଞ୍ଚଳରେ ଦକ୍ଷ ମେକାନିକ, କାରିଗର ଏବଂ ସେବା ପେଶାଦାରଙ୍କ ସହିତ ସଂଯୋଗ କରନ୍ତୁ',
    'home.totalProfessionals': 'ମୋଟ ପେଶାଦାର',
    'home.availableNow': 'ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ',
    'home.averageDailyRate': 'ହାରାହାରି ଦୈନିକ ହାର',
    'home.availableProfessionals': 'ଉପଲବ୍ଧ ପେଶାଦାର',
    'home.noProfessionalsFound': 'କୌଣସି ପେଶାଦାର ମିଳିଲା ନାହିଁ',
    'home.adjustFilters': 'ଅଧିକ ଫଳାଫଳ ଦେଖିବା ପାଇଁ ଆପଣଙ୍କ ସନ୍ଧାନ ଫିଲ୍ଟର ସଜାଡ଼ିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ।',

    // Search Filters
    'filters.searchFilter': 'ସନ୍ଧାନ ଏବଂ ଫିଲ୍ଟର',
    'filters.clearFilters': 'ଫିଲ୍ଟର ସଫା କରନ୍ତୁ',
    'filters.category': 'ବର୍ଗ',
    'filters.allCategories': 'ସମସ୍ତ ବର୍ଗ',
    'filters.state': 'ରାଜ୍ୟ',
    'filters.allStates': 'ସମସ୍ତ ରାଜ୍ୟ',
    'filters.district': 'ଜିଲ୍ଲା',
    'filters.allDistricts': 'ସମସ୍ତ ଜିଲ୍ଲା',
    'filters.maxDailyCost': 'ସର୍ବାଧିକ ଦୈନିକ ଖର୍ଚ୍ଚ (₹)',
    'filters.enterAmount': '₹ ରେ ପରିମାଣ ପ୍ରବେଶ କରନ୍ତୁ',
    'filters.minRating': 'ସର୍ବନିମ୍ନ ରେଟିଂ',
    'filters.anyRating': 'ଯେକୌଣସି ରେଟିଂ',

    // Mechanic Card
    'card.available': 'ଉପଲବ୍ଧ',
    'card.busy': 'ବ୍ୟସ୍ତ',
    'card.unavailable': 'ଅନୁପଲବ୍ଧ',
    'card.noRatings': 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ରେଟିଂ ନାହିଁ',
    'card.stars': 'ତାରକା',
    'card.yearsExp': 'ବର୍ଷର ଅଭିଜ୍ଞତା',
    'card.jobs': 'କାମ',
    'card.perDay': 'ପ୍ରତିଦିନ',
    'card.contact': 'ଯୋଗାଯୋଗ',

    // Registration
    'register.title': 'ଜଣେ ପେଶାଦାର ଭାବରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    'register.subtitle': 'ଆମର ନେଟୱାର୍କରେ ଯୋଗ ଦିଅନ୍ତୁ ଏବଂ ଗ୍ରାହକଙ୍କ ସହିତ ସଂଯୋଗ କରନ୍ତୁ',
    'register.username': 'ଉପଯୋଗକର୍ତ୍ତା ନାମ',
    'register.usernamePlaceholder': 'ଏକ ଅନନ୍ୟ ଉପଯୋଗକର୍ତ୍ତା ନାମ ବାଛନ୍ତୁ',
    'register.password': 'ପାସୱାର୍ଡ',
    'register.passwordPlaceholder': 'ଏକ ପାସୱାର୍ଡ ସୃଷ୍ଟି କରନ୍ତୁ',
    'register.confirmPassword': 'ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ',
    'register.confirmPasswordPlaceholder': 'ଆପଣଙ୍କ ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ',
    'register.fullName': 'ପୂର୍ଣ୍ଣ ନାମ',
    'register.fullNamePlaceholder': 'ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ପ୍ରବେଶ କରନ୍ତୁ',
    'register.category': 'ପେଶାଦାର ବର୍ଗ',
    'register.selectProfession': 'ଆପଣଙ୍କ ବୃତ୍ତି ବାଛନ୍ତୁ',
    'register.state': 'ରାଜ୍ୟ',
    'register.selectState': 'ଆପଣଙ୍କ ରାଜ୍ୟ ବାଛନ୍ତୁ',
    'register.district': 'ଜିଲ୍ଲା',
    'register.selectDistrict': 'ଆପଣଙ୍କ ଜିଲ୍ଲା ବାଛନ୍ତୁ',
    'register.village': 'ଗାଁ/ଅଞ୍ଚଳ',
    'register.villagePlaceholder': 'ଯେପରି, ଅନ୍ଧେରୀ ପଶ୍ଚିମ, କନଟ ପ୍ଲେସ, କୋରମଙ୍ଗଲା',
    'register.dailyRate': 'ଦୈନିକ ହାର (₹)',
    'register.dailyRatePlaceholder': '₹ ରେ ଆପଣଙ୍କ ଦୈନିକ ହାର ପ୍ରବେଶ କରନ୍ତୁ',
    'register.contactNumber': 'ଯୋଗାଯୋଗ ନମ୍ବର',
    'register.contactPlaceholder': 'XXXXXXXXXX',
    'register.email': 'ଇମେଲ ଠିକଣା',
    'register.emailPlaceholder': 'your@email.com',
    'register.experience': 'ଅଭିଜ୍ଞତାର ବର୍ଷ',
    'register.experiencePlaceholder': 'ଅଭିଜ୍ଞତାର ବର୍ଷ',
    'register.availability': 'ବର୍ତ୍ତମାନର ଉପଲବ୍ଧତା',
    'register.description': 'ପେଶାଦାର ବିବରଣୀ',
    'register.descriptionPlaceholder': 'ଆପଣଙ୍କ କୌଶଳ, ବିଶେଷଜ୍ଞତା ଏବଂ ଯାହା ଆପଣଙ୍କୁ ଅଲଗା କରେ ତାହାର ବର୍ଣ୍ଣନା କରନ୍ତୁ...',
    'register.cancel': 'ବାତିଲ',
    'register.registerProfile': 'ପ୍ରୋଫାଇଲ ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    'register.success': 'ପଞ୍ଜୀକରଣ ସଫଳ!',
    'register.successMessage': 'ଆପଣଙ୍କ ଖାତା ସଫଳତାର ସହିତ ସୃଷ୍ଟି ହୋଇଛି! ଆପଣଙ୍କ ଖାତା ଯାଞ୍ଚ କରିବା ପାଇଁ ଦୟାକରି ଆପଣଙ୍କ ଇମେଲ ଯାଞ୍ଚ କରନ୍ତୁ, ତାପରେ ଆପଣ ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ ପରିଚାଳନା କରିବା ପାଇଁ ଲଗ ଇନ କରିପାରିବେ।',
    'register.viewProfessionals': 'ସମସ୍ତ ପେଶାଦାର ଦେଖନ୍ତୁ',

    // Login Modal
    'login.title': 'ମେକାନିକ ଲଗଇନ',
    'login.welcomeBack': 'ଫେରିବାରେ ସ୍ୱାଗତ',
    'login.emailAddress': 'ଇମେଲ ଠିକଣା',
    'login.emailPlaceholder': 'ଆପଣଙ୍କ ଇମେଲ ପ୍ରବେଶ କରନ୍ତୁ',
    'login.passwordPlaceholder': 'ଆପଣଙ୍କ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ',
    'login.cancel': 'ବାତିଲ',
    'login.signIn': 'ସାଇନ ଇନ',
    'login.signingIn': 'ସାଇନ ଇନ ହେଉଛି...',
    'login.loggedIn': 'ଆପଣ ଲଗ ଇନ ହୋଇଛନ୍ତି। "ମେକାନିକ ଖୋଜନ୍ତୁ" ଲୁଚି ଯାଇଛି।',
    'login.logout': 'ଲଗଆଉଟ',

    // Dashboard
    'dashboard.title': 'ମେକାନିକ ଡ୍ୟାସବୋର୍ଡ',
    'dashboard.subtitle': 'ଆପଣଙ୍କ ପେଶାଦାର ପ୍ରୋଫାଇଲ ପରିଚାଳନା କରନ୍ତୁ',
    'dashboard.loading': 'ଆପଣଙ୍କ ଡ୍ୟାସବୋର୍ଡ ଲୋଡ ହେଉଛି...',
    'dashboard.noProfile': 'କୌଣସି ପ୍ରୋଫାଇଲ ମିଳିଲା ନାହିଁ',
    'dashboard.noProfileMessage': 'ଆପଣଙ୍କର ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ମେକାନିକ ପ୍ରୋଫାଇଲ ନାହିଁ।',
    'dashboard.createProfile': 'ପ୍ରୋଫାଇଲ ସୃଷ୍ଟି କରନ୍ତୁ',
    'dashboard.profileUpdated': 'ପ୍ରୋଫାଇଲ ସଫଳତାର ସହିତ ଅପଡେଟ ହୋଇଛି!',
    'dashboard.saving': 'ସେଭ ହେଉଛି...',
    'dashboard.saveChanges': 'ପରିବର୍ତ୍ତନ ସେଭ କରନ୍ତୁ',

    // Footer
    'footer.allRights': 'ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।',
    'footer.craftedWith': '❤️ ଏବଂ ସଫା କୋଡ ସହିତ ତିଆରି',
    'footer.questions': 'କୌଣସି ପ୍ରଶ୍ନ? ମୋତେ ଯୋଗାଯୋଗ କରନ୍ତୁ',

    // Validation Messages
    'validation.usernameRequired': 'ଉପଯୋଗକର୍ତ୍ତା ନାମ ଆବଶ୍ୟକ',
    'validation.usernameLength': 'ଉପଯୋଗକର୍ତ୍ତା ନାମ ଅତି କମରେ 3 ଅକ୍ଷରର ହେବା ଆବଶ୍ୟକ',
    'validation.passwordRequired': 'ପାସୱାର୍ଡ ଆବଶ୍ୟକ',
    'validation.passwordLength': 'ପାସୱାର୍ଡ ଅତି କମରେ 6 ଅକ୍ଷରର ହେବା ଆବଶ୍ୟକ',
    'validation.passwordMismatch': 'ପାସୱାର୍ଡ ମେଳ ଖାଉନାହିଁ',
    'validation.nameRequired': 'ନାମ ଆବଶ୍ୟକ',
    'validation.categoryRequired': 'ବର୍ଗ ଆବଶ୍ୟକ',
    'validation.stateRequired': 'ରାଜ୍ୟ ଆବଶ୍ୟକ',
    'validation.districtRequired': 'ଜିଲ୍ଲା ଆବଶ୍ୟକ',
    'validation.villageRequired': 'ଗାଁ/ଅଞ୍ଚଳ ଆବଶ୍ୟକ',
    'validation.dailyRateRequired': 'ବୈଧ ଦୈନିକ ହାର ଆବଶ୍ୟକ',
    'validation.contactRequired': 'ଯୋଗାଯୋଗ ନମ୍ବର ଆବଶ୍ୟକ',
    'validation.contactInvalid': 'ଦୟାକରି ଏକ ବୈଧ 10-ଅଙ୍କର ଭାରତୀୟ ମୋବାଇଲ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ',
    'validation.emailRequired': 'ଇମେଲ ଆବଶ୍ୟକ',
    'validation.emailInvalid': 'ବୈଧ ଇମେଲ ଆବଶ୍ୟକ',
    'validation.experienceRequired': 'ବୈଧ ଅଭିଜ୍ଞତା ଆବଶ୍ୟକ',
    'validation.descriptionRequired': 'ବିବରଣୀ ଆବଶ୍ୟକ',
    'validation.usernameTaken': 'ଉପଯୋଗକର୍ତ୍ତା ନାମ ପୂର୍ବରୁ ନିଆଯାଇଛି',

    // Language
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.odia': 'ଓଡ଼ିଆ',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};