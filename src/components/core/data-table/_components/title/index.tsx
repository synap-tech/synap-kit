import type React from 'react';

import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TooltipWrapper from '@/components/ui/tooltip-wrapper';

import { cn } from '@/lib/utils';

interface TableTitleProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  info?: string;
}

const TableTitle: React.FC<TableTitleProps> = ({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  info,
}) => {
  return (
    <div className='flex items-start justify-between gap-2 md:justify-start'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <h1
            className={cn(
              'text-lg font-semibold capitalize leading-tight text-foreground md:text-2xl',
              titleClassName
            )}
          >
            {title}
          </h1>

          {info && (
            <TooltipWrapper message={info}>
              <Button type='button' size='icon-sm' variant='ghost'>
                <Info className='size-4' />
              </Button>
            </TooltipWrapper>
          )}
        </div>

        {subtitle && (
          <p
            className={cn(
              'mt-0.5 text-sm capitalize text-secondary',
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default TableTitle;
