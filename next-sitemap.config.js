/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://inflearn-nextjs.vercel.app',
  generateRobotsTxt: true,
};
