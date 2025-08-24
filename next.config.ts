import type { NextConfig } from "next";

const webpack = require('webpack');
const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        })
      );
    }
    return config;
  },
};

export default nextConfig;
