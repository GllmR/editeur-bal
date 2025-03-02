const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  webpack(config, {webpack}) {
    config.resolve.fallback = {fs: false}

    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/))

    return config
  }
})
