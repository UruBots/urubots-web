import type * as prismic from '@prismicio/client';

/**
 * Route Resolver. The locale segment is mandatory so Prismic URLs for the master
 * language (es-ar) are prefixed too, matching the middleware's en-us default.
 */
export const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/:lang',
  },
  // {
  //   type: 'homepage',
  //   path: '/:lang/:uid',
  // },
  {
    type: 'about',
    path: '/:lang',
  },
  {
    type: 'about',
    path: '/:lang/:uid',
  },
  {
    type: 'blog',
    path: '/:lang',
  },
  {
    type: 'blog',
    path: '/:lang/:uid',
  },
  {
    type: 'blogpost',
    path: '/:lang/blog/:uid',
  },
  {
    type: 'award',
    path: '/:lang',
  },
  {
    type: 'award',
    path: '/:lang/:uid',
  },
  {
    type: 'team',
    path: '/:lang',
  },
  {
    type: 'team',
    path: '/:lang/:uid',
  },
  {
    type: 'contact',
    path: '/:lang',
  },
  {
    type: 'contact',
    path: '/:lang/:uid',
  },
  {
    type: 'research',
    path: '/:lang',
  },
  {
    type: 'research',
    path: '/:lang/:uid',
  },
  {
    type: 'donations',
    path: '/:lang',
  },
  {
    type: 'donations',
    path: '/:lang/:uid',
  },
];
