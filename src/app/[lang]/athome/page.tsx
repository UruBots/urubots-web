import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import Layout from '@/components/Layout';
import { getLocales } from '@/lib/getLocales';
import { getMenuItems } from '@/components/Utils/MenuItems';
import { LOCALES } from '@/lib/locales';
import { QualificationMaterials } from '@/components/AtHome/QualificationMaterials';
import { RobotGallery } from '@/components/AtHome/RobotGallery';
import { PlatformSummary } from '@/components/AtHome/PlatformSummary';
import { TeamRoles } from '@/components/AtHome/TeamRoles';
import { OpenSourceRepos } from '@/components/AtHome/OpenSourceRepos';

export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'RoboCup@Home OPL 2027 — UruBots',
  description:
    'UruBots (UTEC, Uruguay) application to the RoboCup@Home Open Platform League 2027 with the Base@Home service robot.',
};

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const client = createClient();
  // Header needs a Prismic document to build the language switcher; reuse the homepage.
  const home = await client.getByUID('homepage', 'homepage', { lang }).catch(() => notFound());
  const locales = await getLocales(home, client);
  const navigation = getMenuItems(lang);

  return (
    <Layout locales={locales} navigation={navigation}>
      <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 pt-32 pb-16">
        <h1 className="mb-2 text-4xl font-bold text-black dark:text-white">
          UruBots — RoboCup@Home Open Platform League 2027
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Team UruBots · Universidad Tecnológica del Uruguay (UTEC) — ITR Norte, Rivera, Uruguay · Target event:
          RoboCup 2027, Nuremberg, Germany, June 15–21, 2027.
        </p>
        <QualificationMaterials />
        <RobotGallery />
        <PlatformSummary />
        <OpenSourceRepos />
        <TeamRoles />
      </div>
      </div>
    </Layout>
  );
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
