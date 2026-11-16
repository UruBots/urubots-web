"use client";
import {useState, useEffect} from "react";
import {SectionTitle} from "@/components/Common/SectionTitle";
import {SingleBlog} from "@/components/SingleBlog";
import {createClient} from "@/prismicio";
import {sortByPublication, withFallbackImages} from "@/lib/press";
import {isFilled} from "@prismicio/client";
import {useParams} from 'next/navigation'

export const BlogList = ({slice}: any) => {
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
            const filteredPosts = sortByPublication(withFallbackImages(posts, lang as string));
            setPosts(filteredPosts);
        };
        fetchData();
    }, [lang]);

    return (
        <section id='blog' className='bg-primary/5 py-16 md:py-20 lg:py-28 dark:bg-gray-900'>
            <div className='container mx-auto'>
                {
                    isFilled.richText(slice.primary.subtitle) && (
                        <SectionTitle
                            title={slice.primary.title}
                            paragraph={slice.primary.subtitle}
                            center
                        />
                        )
                }

                <div className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3'>
                    {posts && posts.slice(0, 3).map((item:any) => (
                        <div key={item.id} className='w-full'>
                            <SingleBlog blog={item}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
