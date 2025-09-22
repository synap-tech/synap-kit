import React from 'react';

import { type IStatus } from '@/types';

import { Badge } from './badge';

const StatusBadge: React.FC<{ status: IStatus }> = ({ status }) => {
  return (
    <Badge
      size={'sm'}
      className='py-0.5 text-xs font-medium capitalize'
      variant={
        status === 'approved'
          ? 'outline-success'
          : status === 'pending'
            ? 'outline-warning'
            : 'outline-destructive'
      }
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
