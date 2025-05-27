import Link from 'next/link';
import {PrismicImage, PrismicRichText} from "@prismicio/react";
import {useParams} from 'next/navigation'

export const SingleBlog = ({ blog }:any) => {
  const { id, title, image, paragraph} = blog.data;
  const params = useParams()
  const {lang} = params

  return (
    <>
      <div id={id} key={id}
        className='wow fadeInUp relative overflow-hidden rounded-md dark:bg-gray-900 bg-white shadow-one dark:bg-dark'
        data-wow-delay='.1s'
      >
        <Link href={`/${lang}/blog/${blog.uid}`} className='relative block h-[220px] w-full'>
          <PrismicImage field={image} className="w-full h-[220px]"/>
        </Link>
        <div className='p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8'>
          <h3>
            <Link
              href={`/${lang}/blog/${blog.uid}`}
              className='mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl'
            >
              {title}
            </Link>
          </h3>
          <div className='mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-black  dark:text-white dark:border-white dark:border-opacity-10'>
            <PrismicRichText field={paragraph}/>
          </div>
        </div>
      </div>
    </>
  );
};
