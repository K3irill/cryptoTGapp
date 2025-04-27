import path from 'path'

export default {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru'],
		localeDetection: true,
	},
	localePath: path.resolve('./public/locales'),
	reloadOnPrerender: process.env.NODE_ENV === 'development',

	debug: false,

	serializeConfig: false,

	interpolation: {
		escapeValue: false,
	},

	partialBundledLanguages: true,

	defaultNS: 'common',
	ns: ['common'],
}
