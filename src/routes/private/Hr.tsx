import { lazy } from 'react';

import type { IRoute } from '@/types';
import { ClipboardList } from 'lucide-react';

const User = lazy(() => import('@/pages/hr/user'));

const HrRoutes: IRoute[] = [
  {
    name: 'HR',
    Icon: ClipboardList,
    children: [
      {
        name: 'User',
        path: '/hr/user',
        element: <User />,
        page_name: 'admin__user',
        actions: [
          'create',
          'read',
          'update',
          'delete',
          'click_status',
          'click_reset_password',
          'click_page_assign',
          'click_rating_change',
          'create_employee',
        ],
      },
    ],
  },
];

export default HrRoutes;
