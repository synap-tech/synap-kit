import { format, formatDate } from 'date-fns';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from './badge';

const Body = ({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) => {
  return (
    <span
      className={
        'text-[0.7rem] font-semibold capitalize text-current ' + className
      }
    >
      {value}
    </span>
  );
};

interface IBadgeWithDateProps {
  status: boolean;
  date: string | Date;
  className?: string;
  isDate?: boolean;
  isTime?: boolean;
  onlyTime?: boolean;
  dateFormat?: string;
  timeFormat?: string;
}

const BadgeWithDate = ({
  status,
  date,
  className,
  dateFormat = 'dd/MM/yy',
  timeFormat = 'h:mm a',
  isDate = true,
  isTime = false,
  onlyTime = false,
}: IBadgeWithDateProps) => {
  const customizedDate = date ? format(new Date(date), dateFormat) : '--';
  const customizedTime = date ? format(new Date(date), timeFormat) : '--';

  return (
    <Badge
      size={'sm'}
      className={cn(
        'space-x-1  flex items-center justify-center w-full',
        status === false
          ? 'size-6  p-0 '
          : 'px-1.5  text-success hover:text-white group',
        className
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
      {status === true && onlyTime && (
        <Body value={customizedTime} className={className} />
      )}
      {status === true && onlyTime === false && isDate === true && (
        <Body value={customizedDate} className={className} />
      )}
      {status === true && onlyTime === false && isTime === true && (
        <Body
          value={customizedTime}
          className={cn('mt-0 text-current/75', !isDate && 'mt-0', className)}
        />
      )}
    </Badge>
  );
};

export default BadgeWithDate;
