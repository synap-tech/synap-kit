import Login from '@/pages/public/login';
import NotFound from '@/pages/public/not-found';
import TestPage from '@/pages/test';

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
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default publicRoutes;
