/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["static.wikia.nocookie.net", "media.blizzard.com"],
    },
};

module.exports = nextConfig;
