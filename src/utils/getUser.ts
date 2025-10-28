import type { IUser } from '@/types';
import Cookies from 'js-cookie';

export async function getUser(): Promise<IUser | null> {
  const user = Cookies.get('user');

  return user ? JSON.parse(user) : null;
}
