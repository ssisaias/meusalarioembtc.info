import type { WebAppManifest } from '@remix-pwa/dev';
import { json } from 'react-router';

export const loader = () => {
  return json(
    {
      short_name: 'Salario Em BTC',
      name: 'Meu Salario Em BTC',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF',
      theme_color: '#FACC15',
      icons: [
        {
          src: '/36x36.png',
          sizes: '36x36',
          type: 'image/png',
        },
        {
          src: '/48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: '/72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ]
    } as WebAppManifest,
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
