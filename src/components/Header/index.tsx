'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggler from '../ThemeToggler';
import {PrismicNextLink} from '@prismicio/next';
import {HeaderProps} from '@/components/types/Header';
import logo from '../../../public/images/logo/logo.svg';
import logo2 from '../../../public/images/logo/logo-2.svg';

export const Header = ({locales, navigation}: HeaderProps) => {
    // @ts-ignore
    const localeLabels: { [key: string] } = {
        'en-us': 'EN',
        'es-ar': 'ES',
        'pt-br': 'PT',
    };

    const {lang} = locales[0];

    console.log("🚀 ~ \n" +
        "lang", lang + "\n" +
        " .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. \n" +
        "| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |\n" +
        "| | _____  _____ | || |  _______     | || | _____  _____ | || |   ______     | || |     ____     | || |  _________   | || |    _______   | |\n" +
        "| ||_   _||_   _|| || | |_   __ \\    | || ||_   _||_   _|| || |  |_   _ \\    | || |   .'    `.   | || | |  _   _  |  | || |   /  ___  |  | |\n" +
        "| |  | |    | |  | || |   | |__) |   | || |  | |    | |  | || |    | |_) |   | || |  /  .--.  \\  | || | |_/ | | \\_|  | || |  |  (__ \\_|  | |\n" +
        "| |  | '    ' |  | || |   |  __ /    | || |  | '    ' |  | || |    |  __'.   | || |  | |    | |  | || |     | |      | || |   '.___`-.   | |\n" +
        "| |   \\ `--' /   | || |  _| |  \\ \\_  | || |   \\ `--' /   | || |   _| |__) |  | || |  \\  `--'  /  | || |    _| |_     | || |  |`\\____) |  | |\n" +
        "| |    `.__.'    | || | |____| |___| | || |    `.__.'    | || |  |_______/   | || |   `.____.'   | || |   |_____|    | || |  |_______.'  | |\n" +
        "| |              | || |              | || |              | || |              | || |              | || |              | || |              | |\n" +
        "| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |\n" +
        " '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' \n" +
        "Created by: sbarcelona@gmail.com\n"
    )

    // Navbar toggle
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    // Sticky Navbar
    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavbar);
    });

    // submenu handler
    const [openIndex, setOpenIndex] = useState(-1);
    const handleSubmenu = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(-1);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <>
            <header
                className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
                    sticky
                        ? '!fixed !z-[9999] !bg-blue-300 !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-blue-900 dark:!bg-opacity-80'
                        : 'absolute'
                }`}
            >
                <div className='w-full'>
                    <div className='relative -mx-4 flex items-center justify-between ml-4 mr-4'>
                        <div className='w-60 max-w-full px-1 md:px-4 xl:mr-12'>
                            <Link
                                href='/'
                                className={`header-logo block w-full ${
                                    sticky ? 'py-5 lg:py-2' : 'py-8'
                                } `}
                            >
                                <Image
                                    src={logo}
                                    alt='logo'
                                    width={100}
                                    height={30}
                                    className='dark:hidden'
                                />
                                <Image
                                    src={logo2}
                                    alt='logo'
                                    width={100}
                                    height={30}
                                    className='hidden dark:block'
                                />
                            </Link>
                        </div>
                        <div className='flex w-full items-center justify-around px-1 md:px-4'>
                            <div>
                                <button
                                    onClick={navbarToggleHandler}
                                    id='navbarToggler'
                                    aria-label='Mobile Menu'
                                    className='absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden'
                                >
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? ' top-[7px] rotate-45' : ' '
                                        }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? 'opacity-0 ' : ' '
                                        }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                                        }`}
                                    />
                                </button>
                                <nav
                                    id='navbarCollapse'
                                    className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-blue-900 dark:bg-blue-500 py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                                        navbarOpen
                                            ? 'visibility top-full opacity-100'
                                            : 'invisible top-[120%] opacity-0'
                                    }`}
                                >
                                    <ul className='block lg:flex lg:space-x-12'>
                                        {navigation.map(
                                            (menuItem, index) => (
                                                <li key={menuItem.id} className='group relative'>
                                                    {menuItem.path ? (
                                                        <Link
                                                            href={menuItem.path}
                                                            className={`flex py-2 text-base ${
                                                                navbarOpen ? 'text-white' : 'text-dark'
                                                            } group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                                                        >
                                                            {menuItem.title}
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <a
                                                                onClick={() => handleSubmenu(index)}
                                                                className={`flex cursor-pointer items-center justify-between py-2 text-base ${
                                                                    navbarOpen ? 'text-white' : 'text-dark'
                                                                } group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                                                            >
                                                                {menuItem.title}
                                                                <span className='pl-3'>
                                                                  <svg
                                                                      width='15'
                                                                      height='14'
                                                                      viewBox='0 0 15 14'
                                                                  >
                                                                    <path
                                                                        d='M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z'
                                                                        fill='currentColor'
                                                                    />
                                                                  </svg>
                                                              </span>
                                                            </a>
                                                            <div
                                                                className={`submenu relative top-full left-0 rounded-md bg-blue-900 dark:bg-blue-500 transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                                                    openIndex === index ? 'block' : 'hidden'
                                                                }`}
                                                            >
                                                                {menuItem.submenu?.map((submenuItem) => (
                                                                        <Link
                                                                            // @ts-ignore
                                                                            href={submenuItem.path}
                                                                            key={submenuItem.id}
                                                                            className='block rounded py-2.5 text-sm text-blue-50 hover:opacity-70 dark:text-white lg:px-3'
                                                                        >
                                                                            {submenuItem.title}
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </nav>
                            </div>
                            <div className='flex items-center justify-end pr-16 lg:pr-0'>
                                <div className='flex flex-wrap gap-3'>
                                    <span className="hidden md:block" aria-hidden={true}>🌐</span>
                                    <ul className='flex flex-wrap gap-3 dark:text-white'>
                                        {locales.map((locale) => (
                                            <li key={locale.lang} className='first:font-semibold'>
                                                <PrismicNextLink
                                                    href={locale.url}
                                                    locale={locale.lang}
                                                    aria-label={`Change language to ${locale.lang_name}`}
                                                >
                                                    {localeLabels[locale.lang] || locale.lang}
                                                </PrismicNextLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <ThemeToggler/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
