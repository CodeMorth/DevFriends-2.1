// src/app/dashboard/[slug]/layout.tsx

import { Metadata } from 'next';

interface SlugProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const metadata: Metadata = {
    title: `Tablero ${params.slug}`,
    description: 'Tableros específicos'
  };

  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
