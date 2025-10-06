import type { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './Hr';
import UiRoutes from './ui';

const privateRoutes: IRoute[] = [...HrRoutes, ...UiRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
