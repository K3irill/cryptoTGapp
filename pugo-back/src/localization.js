const fs = require('fs');
const path = require('path');

const locales = {};

// Загружаем все файлы локализаций
const localeFiles = fs.readdirSync(path.join(__dirname, 'locales'));

localeFiles.forEach(file => {
  if (file.endsWith('.json')) {
    const lang = file.split('.')[0];
    locales[lang] = require(path.join(__dirname, 'locales', file));
  }
});

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

module.exports = {
  getLocalizedText: (lang, key, replacements = {}) => {
    if (!locales[lang]) lang = 'en'; // Fallback to English
    
    let text = getNestedValue(locales[lang], key) || 
               getNestedValue(locales['en'], key) || 
               key; // Fallback to English or return key
    
    // Заменяем плейсхолдеры
    if (typeof text === 'string') {
      for (const [placeholder, value] of Object.entries(replacements)) {
        text = text.replace(new RegExp(`{${placeholder}}`, 'g'), value);
      }
    }
    
    return text;
  },
  
  getLocalizedButtons: (lang, key) => {
    return getNestedValue(locales[lang], `${key}.buttons`) || 
           getNestedValue(locales['en'], `${key}.buttons`) || 
           {};
  },
  
  getAvailableLanguages: () => {
    return Object.keys(locales);
  }
};