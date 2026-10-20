import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const url = (process.env.NEXT_PUBLIC_SITE_URL || 'https://klyv.com.br').replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
