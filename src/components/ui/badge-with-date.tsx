import { formatDate } from 'date-fns';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from './badge';

interface IBadgeWithDateProps {
  status: boolean;
  date: string;
}

const BadgeWithDate = ({ status, date }: IBadgeWithDateProps) => {
  return (
    <Badge
      size={'sm'}
      className={cn(
        'space-x-0.5  flex items-center justify-center',
        status === false
          ? ' size-6 p-0 '
          : 'px-1.5 !text-success hover:!text-white group'
      )}
      variant={status === true ? 'outline-success' : 'outline-destructive'}
    >
      <span>
        {status === true ? (
          <Check className='size-4' />
        ) : (
          <X className='size-4' />
        )}
      </span>
      {date && (
        <span className='text-xs font-medium  italic '>
          {formatDate(date, 'dd MMM, yyyy')}
        </span>
      )}
    </Badge>
  );
};

export default BadgeWithDate;
