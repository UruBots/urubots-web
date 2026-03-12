import { Menu } from '@/components/types/Menu';

const menuData = {
  'en-us': [
    {
      id: 1,
      title: 'Home',
      path: '/en-us',
      newTab: false,
    },
    {
      id: 2,
      title: 'About',
      path: '/en-us/about',
      newTab: false,
    },
    {
      id: 3,
      title: 'Blog',
      path: '/en-us/blog',
      newTab: false,
    },
    {
      id: 4,
      title: 'Awards',
      path: '/en-us/award',
      newTab: false,
    },
    {
        id: 5,
        title: 'Team',
        path: '/en-us/team',
        newTab: false,
    },
    {
      id: 6,
      title: 'TDPs',
      path: '/en-us/research',
      newTab: false,
    },
    {
      id: 7,
      title: 'Donate',
      path: '/en-us/donations',
      newTab: false,
    },
    {
      id: 8,
      title: 'Contact',
      path: '/en-us/contact',
      newTab: false,
    },
  ],
  'es-ar': [
    {
      id: 1,
      title: 'Inicio',
      path: '/',
      newTab: false,
    },
    {
      id: 2,
      title: 'Sobre nosotros',
      path: '/about',
      newTab: false,
    },
    {
      id: 3,
      title: 'Blog',
      path: '/blog',
      newTab: false,
    },
    {
      id: 4,
      title: 'Premios',
      path: '/award',
      newTab: false,
    },
    {
        id: 5,
        title: 'Equipo',
        path: '/team',
        newTab: false,
    },
    {
      id: 6,
      title: 'TDPs',
      path: '/research',
      newTab: false,
    },
    {
      id: 7,
      title: 'Donar',
      path: '/donations',
      newTab: false,
    },
    {
      id: 8,
      title: 'Contacto',
      path: '/contact',
      newTab: false,
    },
  ],
  'pt-br': [
    {
      id: 1,
      title: 'Inicio',
      path: '/pt-br',
      newTab: false,
    },
    {
      id: 2,
      title: 'Sobre nós',
      path: '/pt-br/about',
      newTab: false,
    },
    {
      id: 3,
      title: 'Blogue',
      path: '/pt-br/blog',
      newTab: false,
    },
    {
      id: 4,
      title: 'Prêmios',
      path: '/pt-br/award',
      newTab: false,
    },
    {
        id: 5,
        title: 'Equipe',
        path: '/pt-br/team',
        newTab: false,
    },
    {
      id: 6,
      title: 'TDPs',
      path: '/pt-br/research',
      newTab: false,
    },
    {
      id: 7,
      title: 'Doar',
      path: '/pt-br/donations',
      newTab: false,
    },
    {
      id: 8,
      title: 'Contato',
      path: '/pt-br/contact',
      newTab: false,
    },
  ],
};

export const getMenuItems = (lang: string) => {
  // @ts-ignore
  return menuData[lang];
};

export default menuData;
