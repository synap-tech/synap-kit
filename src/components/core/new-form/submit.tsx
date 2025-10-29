import React from 'react';

import type { ButtonProps } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { cn } from '@/lib/utils';

const FormSubmit: React.FC<
  ButtonProps & {
    title?: string;
    isSubmitDisable?: boolean;
  }
> = ({ title = 'Submit', ...props }) => {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  return (
    <Button
      title='Submit Form'
      aria-label='Submit Form'
      disabled={!isDirty || isSubmitting || props.isSubmitDisable}
      type='submit'
      className={cn('w-full md:max-w-sm  mx-auto', props.className)}
      {...props}
    >
      {isSubmitting && <Spinner />}
      {isSubmitting ? `Please wait...` : title}
    </Button>
  );
};

export default FormSubmit;
