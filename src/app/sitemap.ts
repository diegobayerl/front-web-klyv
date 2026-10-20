import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (process.env.NEXT_PUBLIC_SITE_URL || 'https://klyv.com.br').replace(/\/$/, '');
  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
