import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import Layout from '@/components/Layout';
import { getLocales } from '@/lib/getLocales';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import { getMenuItems } from '@/components/Utils/MenuItems';

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ uid: string; lang: string }> }) {
  const { uid, lang } = await params;
  // console.log('##### competition #####', lang);
  const client = createClient();
  const page = await client
    .getByUID('competition', 'competition', { lang })
    .catch(() => notFound());

  const locales = await getLocales(page, client);
  const navigation = getMenuItems(lang);

  return (
    <Layout locales={locales} navigation={navigation}>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
}

// export async function generateStaticParams() {
//   const client = createClient();
//   const pages = await client.getAllByType('competition', { lang: '*' });
//   return pages.map((page) => {
//     return {
//       uid: page.uid,
//       lang: page.lang,
//     };
//   });
// }
