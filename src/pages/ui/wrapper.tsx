import React from 'react';

import { Separator } from '@/components/ui/separator';

const Wrapper: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className='border px-6 py-4 rounded bg-background'>
      <h4 className='text-2xl font-bold'>{title}</h4>
      <Separator className='mt-1 mb-4' />
      {children}
    </div>
  );
};

export default Wrapper;
