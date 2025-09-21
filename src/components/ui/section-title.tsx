import React from 'react';

import { Info } from 'lucide-react';

import { Title } from './title';

const SectionTitle: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='flex items-center gap-2'>
      <Title>{children}</Title>
      <Info className='size-4.5' />
    </div>
  );
};

export default SectionTitle;
