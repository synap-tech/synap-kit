import { X } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';

const DeleteButton: React.FC<Pick<ButtonProps, 'onClick'>> = ({ onClick }) => {
  return (
    <Button type='button' variant={'outline'} size={'icon'} onClick={onClick}>
      <X className=' size-5  text-destructive' />
    </Button>
  );
};

export default DeleteButton;
