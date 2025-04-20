import type { NextConfig } from 'next'

import { configi18 } from './next-i18next.config'

const nextConfig: NextConfig = {
	/* config options here */
  configi18,
	reactStrictMode: false,
}

export default nextConfig
