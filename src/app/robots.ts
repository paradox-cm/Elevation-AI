import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/website/home',
          '/website/platform',
          '/website/solutions',
          '/website/pricing',
          '/website/about',
          '/website/contact',
          '/website/demo',
          '/website/sign-up',
          '/website/partners',
          '/website/investors',
          '/website/developers',
          '/website/careers',
          '/website/security',
          '/website/press',
          '/website/knowledge-base',
          '/website/people-concierge',
          '/website/people-experts',
          '/website/people-partners',
          '/website/resources',
          '/website/blog',
          '/privacy',
          '/terms-of-service',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/design-system/',
          '/login/',
          '/website/login',
          '/website/sign-up',
          '/website/demo',
          '/website/contact/message/',
          '/website/test-cms/',
          '/website/home-dynamic/',
          '/website/partnership/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: 'https://elevationai.com/sitemap.xml',
    host: 'https://elevationai.com',
  }
}
