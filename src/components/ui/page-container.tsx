import React from 'react';

import { cn } from '@/lib/utils';

const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn('border bg-base p-4 rounded', className)}>
      {children}
    </div>
  );
};

export default PageContainer;
