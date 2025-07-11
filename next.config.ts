import type { NextConfig } from "next";
import withPWA from 'next-pwa';

// Configuración para PWA
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default pwaConfig(nextConfig);
