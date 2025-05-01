const path = require('path')

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru', 'ua', 'cn', 'fr', 'de', 'pt', 'es'],
    localeDetection: false,
	},
	localePath: path.resolve('./public/locales'),
	reloadOnPrerender: process.env.NODE_ENV === 'development',
	debug: false,
  react: { useSuspense: false },
	serializeConfig: false,
	interpolation: {
		escapeValue: false,
	},
	partialBundledLanguages: true,
	defaultNS: 'common',
	ns: ['common'],
}
