import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NODE_ENV !== 'production') return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
