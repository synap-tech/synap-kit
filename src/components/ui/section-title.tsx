import React from 'react';

import { Info } from 'lucide-react';

import { Button } from './button';
import { Title } from './title';
import TooltipWrapper from './tooltip-wrapper';

const SectionTitle: React.FC<{
  title: string;
  info?: string;
}> = ({ title, info }) => {
  return (
    <div className='flex items-center gap-2'>
      <Title>{title}</Title>
      {info && (
        <TooltipWrapper message={info}>
          <Button type='button' size='icon-sm' variant='ghost'>
            <Info className='size-4' />
          </Button>
        </TooltipWrapper>
      )}
    </div>
  );
};

export default SectionTitle;
