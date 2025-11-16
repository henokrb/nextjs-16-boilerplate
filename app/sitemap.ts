import { MetadataRoute } from 'next';
import { baseURL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  

    return [
        {
             url: baseURL,
             lastModified: new Date(),
             changeFrequency: 'daily',
             priority: 1.0,
        },
        {
             url: `${baseURL}/webdevelopment`,
             lastModified: new Date(),
             changeFrequency: 'weekly',
             priority: 0.8,
        },
        {
             url: `${baseURL}/hosting`,
             lastModified: new Date(),
             changeFrequency: 'monthly',
             priority: 0.8,
        },
        
      
    ];
}

