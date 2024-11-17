import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
      return [
          {
              source: "/", // Ruta raíz
              destination: "/hello", // Redirigir a /hello
              permanent: true, // Redirección permanente (301)
          },
      ];
  },
};

export default nextConfig;
