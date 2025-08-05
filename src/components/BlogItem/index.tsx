import {PrismicImage, PrismicRichText} from "@prismicio/react";
import Image from "next/image";

export const BlogItem = ({slice}:any) => {
    if(!slice) return null;

    return (
        <section className="pb-[120px] pt-[150px]">
        <div>
            <div className="-mx-4 flex flex-wrap justify-center">
                <div className="w-full px-4 lg:w-8/12">
                    <div>
                        <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                            {slice.title}
                        </h1>
                        <div
                            className="mb-10 flex flex-wrap items-center justify-between border-b border-stroke pb-4 dark:border-stroke-dark">
                            <div className="flex flex-wrap items-center">
                            </div>
                        </div>
                        <div>
                            <div className="mb-10 w-full overflow-hidden rounded-sm">
                                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                                    <PrismicImage field={slice.image}/>
                                </div>
                            </div>
                            <div className="blog-details mb-12 text-black dark:text-neutral-100 text-lg">
                                <PrismicRichText field={slice.content} components={{
                                    paragraph: ({ children }) => (
                                        <p className="leading-relaxed mb-4">{children}</p>
                                    ),
                                    image: ({ node }) => {
                                        const { url, alt, dimensions } = node;

                                        if (!url || !dimensions) return null;

                                        return (
                                            <div className="flex justify-center my-4">
                                                <img
                                                    src={url}
                                                    alt={alt || ''}
                                                    width={dimensions.width}
                                                    height={dimensions.height}
                                                    className="rounded"
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        );
                                    },
                                }}/>
                            </div>
                            {/*<div className="items-center justify-between sm:flex">*/}
                            {/*    <div className="mb-5"><h5*/}
                            {/*        className="mb-3 text-sm font-medium text-body-color dark:text-body-color-dark sm:text-right">Share*/}
                            {/*        this post :</h5>*/}
                            {/*        <div className="flex items-center sm:justify-end"><a href="#0"*/}
                            {/*                                                             aria-label="social-share"*/}
                            {/*                                                             className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary sm:ml-3">*/}
                            {/*            <svg width="16" height="16" viewBox="0 0 16 16" className="fill-current">*/}
                            {/*                <path*/}
                            {/*                    d="M14.3442 0H1.12455C0.499798 0 0 0.497491 0 1.11936V14.3029C0 14.8999 0.499798 15.4222 1.12455 15.4222H14.2942C14.919 15.4222 15.4188 14.9247 15.4188 14.3029V1.09448C15.4688 0.497491 14.969 0 14.3442 0ZM4.57316 13.1089H2.29907V5.7709H4.57316V13.1089ZM3.42362 4.75104C2.67392 4.75104 2.09915 4.15405 2.09915 3.43269C2.09915 2.71133 2.69891 2.11434 3.42362 2.11434C4.14833 2.11434 4.74809 2.71133 4.74809 3.43269C4.74809 4.15405 4.19831 4.75104 3.42362 4.75104ZM13.1947 13.1089H10.9206V9.55183C10.9206 8.7061 10.8956 7.58674 9.72108 7.58674C8.52156 7.58674 8.34663 8.53198 8.34663 9.47721V13.1089H6.07255V5.7709H8.29665V6.79076H8.32164C8.64651 6.19377 9.37122 5.59678 10.4958 5.59678C12.8198 5.59678 13.2447 7.08925 13.2447 9.12897V13.1089H13.1947Z"></path>*/}
                            {/*            </svg>*/}
                            {/*        </a><a href="#0" aria-label="social-share"*/}
                            {/*               className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary">*/}
                            {/*            <svg width="18" height="18" viewBox="0 0 22 22" fill="none"*/}
                            {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                <path fill-rule="evenodd" clip-rule="evenodd"*/}
                            {/*                      d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"*/}
                            {/*                      fill="currentColor"></path>*/}
                            {/*            </svg>*/}
                            {/*        </a><a href="#0" aria-label="social-share"*/}
                            {/*               className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary">*/}
                            {/*            <svg width="18" height="18" viewBox="0 0 22 22" fill="none"*/}
                            {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                <path*/}
                            {/*                    d="M12.1 10.494V7.42717C12.1 6.23996 13.085 5.27753 14.3 5.27753H16.5V2.05308L13.5135 1.84464C10.9664 1.66688 8.8 3.63794 8.8 6.13299V10.494H5.5V13.7184H8.8V20.1668H12.1V13.7184H15.4L16.5 10.494H12.1Z"*/}
                            {/*                    fill="currentColor"></path>*/}
                            {/*            </svg>*/}
                            {/*        </a></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}
