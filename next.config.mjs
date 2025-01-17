const nextConfig = {
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './src/helpers/ImageLoader.ts',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
