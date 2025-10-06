import Login from '@/pages/public/login';
import NotFound from '@/pages/public/not-found';
import UiPage from '@/pages/ui';

const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
  {
    path: '/ui',
    element: <UiPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default publicRoutes;
