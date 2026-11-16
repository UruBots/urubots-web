import {Metadata} from "next";
import {createClient} from "@/prismicio";
import {notFound} from "next/navigation";
import {getLocales} from "@/lib/getLocales";
import {getMenuItems} from "@/components/Utils/MenuItems";
import Layout from "@/components/Layout";
import {BlogItem} from "@/components/BlogItem";
import {LOCALES} from "@/lib/locales";

export const dynamicParams = false;
type Params = { uid: string };

export async function generateMetadata({params}: { params: Promise<Params> }): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID("blogpost", uid).catch(() => notFound());
    return {
        // @ts-ignore
        title: page.data.title,
        description: page.data.meta_description,
        openGraph: {
            title: page.data.meta_title ?? undefined,
            images: [{ url: page.data.meta_image.url ?? "" }],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ uid: string; lang: string }> }) {
  const { uid, lang } = await params;
    const client = createClient();
    const page = await client
        .getByUID('blogpost', uid, {lang})
        .catch(() => notFound());

    // Translated copies may lack the cover image: reuse the one of the same post in another locale.
    if (!page.data.image?.url) {
        for (const other of LOCALES.filter((l) => l !== lang)) {
            const sibling = await client.getByUID('blogpost', uid, {lang: other}).catch(() => null);
            if (sibling?.data.image?.url) {
                page.data.image = sibling.data.image;
                break;
            }
        }
    }

    const locales = await getLocales(page, client);
    const navigation = getMenuItems(lang);

    return (
        <Layout locales={locales} navigation={navigation}>
            {/*<SliceZone slices={page.data.slices} components={components}/>*/}
            <BlogItem slice={page.data} lang={lang} />
        </Layout>
    );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('blogpost', { lang: '*' });
  return pages.map((page) => {
    return {
      uid: page.uid,
      lang: page.lang,
    };
  });
}
