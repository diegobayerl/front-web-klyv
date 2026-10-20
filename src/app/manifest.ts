import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Klyv | Inteligência Comercial',
    short_name: 'Klyv',
    description: 'Do primeiro contato à próxima conquista. Organize clientes, conduza propostas, acompanhe entregas, pesquisas de satisfação e opere com a Lia no Klyv.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfcfa',
    theme_color: '#073F67',
    lang: 'pt-BR',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
