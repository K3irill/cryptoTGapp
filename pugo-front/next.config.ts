// next.config.ts
import { NextConfig } from 'next'
import i18nConfig from './next-i18next.config'

const nextConfig: NextConfig = {
	reactStrictMode: false,
	i18n: i18nConfig.i18n,
}

export default nextConfig
