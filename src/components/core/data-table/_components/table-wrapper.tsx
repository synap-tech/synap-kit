import React from 'react';

import { cn } from '@/lib/utils';

const TableWrapper: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex h-full relative flex-col gap-4 px-3 lg:px-5 pt-4 pb-2 border border-border bg-card text-card-foreground rounded',
        className
      )}
    >
      {children}
    </div>
  );
};

export default TableWrapper;
