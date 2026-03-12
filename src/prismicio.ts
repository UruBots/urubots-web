import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import config from '../slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/:lang?',
  },
  // {
  //   type: 'homepage',
  //   path: '/:lang?/:uid',
  // },
  {
    type: 'about',
    path: '/:lang?',
  },
  {
    type: 'about',
    path: '/:lang?/:uid',
  },
  {
    type: 'blog',
    path: '/:lang?',
  },
  {
    type: 'blog',
    path: '/:lang?/:uid',
  },
  {
    type: 'blogpost',
    path: '/:lang?/blog/:uid',
  },
  {
    type: 'award',
    path: '/:lang?',
  },
  {
    type: 'award',
    path: '/:lang?/:uid',
  },
  {
    type: 'team',
    path: '/:lang?',
  },
  {
    type: 'team',
    path: '/:lang?/:uid',
  },
  {
    type: 'contact',
    path: '/:lang?',
  },
  {
    type: 'contact',
    path: '/:lang?/:uid',
  },
  {
    type: 'research',
    path: '/:lang?',
  },
  {
    type: 'research',
    path: '/:lang?/:uid',
  },
  {
    type: 'donations',
    path: '/:lang?',
  },
  {
    type: 'donations',
    path: '/:lang?/:uid',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({client});

  return client;
};
