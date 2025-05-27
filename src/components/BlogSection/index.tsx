"use client";
import {useState, useEffect} from "react";
import {createClient} from "@/prismicio";
import {PrismicImage, PrismicRichText} from "@prismicio/react";
import Link from "next/link";
import {useParams} from 'next/navigation'


export const BlogSection = ({slice}: any) => {
    const params = useParams()
    const {lang} = params
    const [posts, setPosts] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const client = createClient();
            const posts = await client.getAllByType("blogpost", {
                lang: '*',
                orderings: [
                    {field: "document.first_publication_date", direction: "desc"},
                ],
            });
            if (!posts) {
                return null;
            }
            const filteredPosts = posts.filter((post: any) => post.lang == lang);
            setPosts(filteredPosts);
        };
        fetchData();
    }, [lang]);

    return (
        <section className="pb-[120px] pt-[120px]">
            <div className="container">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                    {
                        posts && posts.map((post: any, index: number) => (
                            <div key={post.id}>
                                <Link href={`/${lang}/blog/${post.uid}`}>
                                    <div
                                        className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-gray-900 dark:hover:shadow-gray-dark">
                                        <div className="relative block aspect-[37/22] w-full overflow-hidden h-[220px]">
                                            <PrismicImage field={post.data.image} />
                                        </div>
                                        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                                            <h3 className="mb-4 block text-xl font-bold text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary sm:text-[22px]">
                                                { post.data.title }
                                            </h3>
                                            <div className="mb-6 border-b border-body-color/10 pb-6 text-base text-body-color dark:border-white/10 dark:text-neutral-100">
                                                <PrismicRichText field={post.data.paragraph}/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
