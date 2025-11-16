import { MetadataRoute } from 'next';
import { baseURL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {

  return {
    rules: [ 
        {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        {
            userAgent: 'Googlebot',
            allow: '/',
            disallow: ['/privacy-policy', '/terms-of-service'],
        }
    ],
    sitemap: `${baseURL}/sitemap.xml`,   
  };    
}