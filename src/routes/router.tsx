import { getUserAndToken } from '@/utils/getUser';
import { createBrowserRouter, redirect } from 'react-router';

import Layout from '@/components/layout';

import { flatRoutes } from '.';
import publicRoutes from './public';

// @ts-expect-error
async function clientMiddleware({ request }, next) {
  const data = await getUserAndToken();

  if (!data) {
    throw redirect('/login');
  }

  await next();
}

export const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <Layout />,
    children: flatRoutes,
    middleware: [clientMiddleware],
  },
]);
