import { Repeat } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';

function Transfer({ onClick, ...props }: ButtonProps) {
  return (
    <Button
      size={'icon'}
      className='size-7 rounded-full bg-black/50'
      onClick={onClick}
      {...props}
    >
      <Repeat className='size-4' />
    </Button>
  );
}

export default Transfer;
