import { useHotkeys } from 'react-hotkeys-hook';

import CoreForm from '@/components/core/form';
import { Form } from '@/components/ui/form';

import { DevTool } from '@/lib/react-hook-devtool';
import { cn } from '@/lib/utils';

import ModalWrapper from './modal-wrapper';
import type { IAddModalProps } from './types';

const AddModal: React.FC<IAddModalProps> = ({
  form,
  onSubmit,
  open,
  setOpen,
  title,
  subtitle,
  children,
  className,
  isSmall = false,
  isLarge = false,
  containerClassName,
}) => {
  useHotkeys(
    'esc',
    () => {
      if (open) setOpen(false);
    },
    [open]
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title={title}
      subtitle={subtitle}
      className={className}
      isSmall={isSmall}
      isLarge={isLarge}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='relative space-y-6   flex-1 flex flex-col justify-between'
        >
          <div className={cn('space-y-3', containerClassName)}>{children}</div>
          <CoreForm.Submit
            className='w-full max-w-sm mx-auto flex rounded'
            title='Save'
          />
          <DevTool control={form.control} placement='top-left' />
        </form>
      </Form>
    </ModalWrapper>
  );
};

export default AddModal;
