import type { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './Hr';
import TestRoutes from './test';

const privateRoutes: IRoute[] = [...HrRoutes, ...TestRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
