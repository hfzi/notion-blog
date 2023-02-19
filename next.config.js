module.exports = {
  images: {
    domains: [
      "d1231c29xbpffx.cloudfront.net",
      "source.unsplash.com",
      "s3.us-west-2.amazonaws.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
