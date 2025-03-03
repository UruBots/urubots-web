import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo/logo.svg';
import logo2 from '../../../public/images/logo/logo-2.svg';

export const Footer = ({navigation}: any) => {
    return (
        <>
            <footer
                className='wow fadeInUp relative z-10 bg-primary dark:dark:bg-gray-900 bg-opacity-5 pt-8 md:pt-16 lg:pt-24'
                data-wow-delay='.1s'
            >
                <div className='w-full'>
                    <div className='-mx-4 flex flex-wrap'>
                        <div className='w-full px-4 md:w-1/2 lg:w-6/12 xl:w-5/12'>
                            <div className='ml-6 mb-12 max-w-[360px] lg:mb-16'>
                                <Link href='/' className='mb-8 inline-block'>
                                    <Image
                                        src={logo}
                                        alt='logo'
                                        className='dark:hidden'
                                        width={140}
                                        height={30}
                                    />
                                    <Image
                                        src={logo2}
                                        alt='logo'
                                        className='hidden dark:block'
                                        width={140}
                                        height={30}
                                    />
                                </Link>
                                <div className='flex items-center'>
                                    <a
                                        href='https://instagram.com/urubotsutec'
                                        target="_blank"
                                        aria-label='social-link'
                                        className='mr-6 text-primary hover:text-blue-900 dark:text-white dark:hover:text-blue-500'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                        </svg>
                                    </a>
                                    <a
                                        href='https://github.com/UruBots'
                                        aria-label='social-link'
                                        target="_blank"
                                        className='mr-6 text-primary hover:text-blue-900 dark:text-white dark:hover:text-blue-500'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                                        </svg>
                                    </a>
                                    <a
                                        href='https://www.youtube.com/channel/UCA_z5YODz_8rv_FEOuAKABA'
                                        aria-label='social-link'
                                        target="_blank"
                                        className='mr-6 text-primary hover:text-blue-900 dark:text-white dark:hover:text-blue-500'
                                    >
                                        <svg
                                            width='18'
                                            height='14'
                                            viewBox='0 0 18 14'
                                            className='fill-current'
                                        >
                                            <path
                                                d='M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z'/>
                                        </svg>
                                    </a>
                                    <a
                                        href='https://www.linkedin.com/in/urubots-utec-4a3267283/'
                                        aria-label='social-link'
                                        target="_blank"
                                        className='mr-6 text-primary hover:text-blue-900 dark:text-white dark:hover:text-blue-500'
                                    >
                                        <svg
                                            width='17'
                                            height='16'
                                            viewBox='0 0 17 16'
                                            className='fill-current'
                                        >
                                            <path
                                                d='M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z'/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12'>
                            <div className='ml-6 mb-12 lg:mb-16'>
                                <ul>
                                    {navigation.map((menuItem: {
                                        id: number;
                                        title: string;
                                        path: string;
                                    }) => (
                                        <li key={menuItem.id} className='group relative'>
                                            {menuItem.path ? (
                                                <Link
                                                    href={menuItem.path}
                                                    className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-3 lg:px-0`}
                                                >
                                                    {menuItem.title}
                                                </Link>
                                            ) : (
                                                <></>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/*<div className='w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12'>*/}
                        {/*    <div className='ml-6 mb-12 lg:mb-16'>*/}
                        {/*        <h2 className='mb-5 text-xl font-bold text-black dark:text-white'>*/}
                        {/*            {*/}
                        {/*                navigation.find(*/}
                        {/*                    (item: { submenu: [] }) =>*/}
                        {/*                        item.submenu && item.submenu.length > 0*/}
                        {/*                ).title*/}
                        {/*            }*/}
                        {/*        </h2>*/}
                        {/*        <ul>*/}
                        {/*            {navigation*/}
                        {/*                .find(*/}
                        {/*                    (item: { submenu: [] }) =>*/}
                        {/*                        item.submenu && item.submenu.length > 0*/}
                        {/*                )*/}
                        {/*                .submenu.map(*/}
                        {/*                    (menuItem: {*/}
                        {/*                        id: number;*/}
                        {/*                        title: string;*/}
                        {/*                        path: string;*/}
                        {/*                        newTab: boolean;*/}
                        {/*                    }) => (*/}
                        {/*                        <li key={menuItem.id} className='group relative'>*/}
                        {/*                            {menuItem.path ? (*/}
                        {/*                                <Link*/}
                        {/*                                    href={menuItem.path}*/}
                        {/*                                    className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-3 lg:px-0`}*/}
                        {/*                                >*/}
                        {/*                                    {menuItem.title}*/}
                        {/*                                </Link>*/}
                        {/*                            ) : (*/}
                        {/*                                <></>*/}
                        {/*                            )}*/}
                        {/*                        </li>*/}
                        {/*                    )*/}
                        {/*                )}*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className='w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12'>*/}
                        {/*    <div className='ml-6 mb-12 lg:mb-16'>*/}
                        {/*        <h2 className='mb-5 text-xl font-bold text-black dark:text-white'>*/}
                        {/*            {navigation.at(5).title}*/}
                        {/*        </h2>*/}
                        {/*        <ul>*/}
                        {/*            {navigation.at(5).submenu.map(*/}
                        {/*                (menuItem: {*/}
                        {/*                    id: number;*/}
                        {/*                    title: string;*/}
                        {/*                    path: string;*/}
                        {/*                    newTab: boolean;*/}
                        {/*                }) => (*/}
                        {/*                    <li key={menuItem.id} className='group relative'>*/}
                        {/*                        {menuItem.path ? (*/}
                        {/*                            <Link*/}
                        {/*                                href={menuItem.path}*/}
                        {/*                                className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-3 lg:px-0`}*/}
                        {/*                            >*/}
                        {/*                                {menuItem.title}*/}
                        {/*                            </Link>*/}
                        {/*                        ) : (*/}
                        {/*                            <></>*/}
                        {/*                        )}*/}
                        {/*                    </li>*/}
                        {/*                )*/}
                        {/*            )}*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className='bg-primary/10 py-8'>
                    <div className='w-full'>
                        <p className='text-center text-base text-body-color dark:text-white'>
                            URUBOTS &#10084; &#65039;- {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};
