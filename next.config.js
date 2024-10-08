/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  optimizeFonts: false,
  reactStrictMode: false,
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader'
    });

    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@resvg/resvg-js': '@resvg/resvg-js'
      });
    }

    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    return config;
  }
};

module.exports = nextConfig;
