import { useEffect } from 'react';

import { FormProvider } from 'react-hook-form';

import NewForm from '@/components/core/new-form';
import { FieldGroup } from '@/components/ui/field';

import { DevTool } from '@/lib/react-hook-devtool';

import type { AddEditWrapper } from './types';

function FormAddEditWrapper({
  children,
  form,
  onSubmit,
  title,
  isSubmitDisable = false,
}: AddEditWrapper) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {children}
          <NewForm.Submit
            className='w-full'
            title='Save'
            isSubmitDisable={isSubmitDisable}
          />
        </FieldGroup>
        <DevTool control={form.control} placement='top-left' />
      </form>
    </FormProvider>
  );
}

export default FormAddEditWrapper;
