import type { IUser } from '@/types';
import Cookies from 'js-cookie';

export async function getUserAndToken(): Promise<{
  user: IUser;
  token: string;
} | null> {
  const user = Cookies.get('user');
  const token = Cookies.get('auth');

  return user && token ? { user: JSON.parse(user), token } : null;
}
