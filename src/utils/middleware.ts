import { redirect } from 'react-router';

import { getUserAndToken } from './getUser';

// @ts-expect-error
export async function authMiddleware({ request }, next) {
  const data = await getUserAndToken();

  if (!data) {
    throw redirect('/login');
  }

  await next();
}
