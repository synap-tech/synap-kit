import {
  type Control,
  type FieldValues,
  FormProvider,
  type SubmitHandler,
} from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';

import CoreForm from '@/components/core/form/v2';

import { DevTool } from '@/lib/react-hook-devtool';
import { cn } from '@/lib/utils';

import ModalWrapper from './modal-wrapper';
import type { IAddModalProps } from './types';

function AddModal<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
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
}: IAddModalProps<TFieldValues, TContext, TTransformedValues>) {
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
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(
            onSubmit as unknown as SubmitHandler<TTransformedValues>
          )}
          className='relative space-y-6   flex-1 flex flex-col justify-between'
        >
          <div className={cn('space-y-3', containerClassName)}>{children}</div>
          <CoreForm.Submit title='Save' />
          <DevTool
            control={
              form.control as unknown as Control<
                TFieldValues,
                any,
                TFieldValues
              >
            }
            placement='top-left'
          />
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}

export default AddModal;
