import type { IRoute } from '@/types';

const TestRoutes: IRoute[] = [
  {
    name: 'Route 1',
    page_name: 'admin__route_1',
    path: '/route-1',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    name: 'Route 2',
    page_name: 'admin__route_2',
    path: '/route-2',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    name: 'Route 3',
    page_name: 'admin__route_3',
    path: '/route-3',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    name: 'Route 4',
    page_name: 'admin__route_4',
    path: '/route-4',
    actions: ['create', 'read', 'update', 'delete'],
  },
  {
    name: 'Route 5',
    page_name: 'admin__route_5',
    path: '/route-5',
    actions: ['create', 'read', 'update', 'delete'],
  },
];

export default TestRoutes;
