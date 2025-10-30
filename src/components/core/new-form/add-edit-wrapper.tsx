import { useEffect } from 'react';

import {
  type Control,
  type FieldValues,
  FormProvider,
  type SubmitHandler,
} from 'react-hook-form';

import NewForm from '@/components/core/new-form';
import { FieldGroup } from '@/components/ui/field';

import { DevTool } from '@/lib/react-hook-devtool';

import type { AddEditWrapper } from './types';

function FormAddEditWrapper<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  children,
  form,
  onSubmit,
  title,
  isSubmitDisable = false,
}: AddEditWrapper<TFieldValues, TContext, TTransformedValues>) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit as unknown as SubmitHandler<TTransformedValues>
        )}
      >
        <FieldGroup>
          {children}
          <NewForm.Submit title='Save' isSubmitDisable={isSubmitDisable} />
        </FieldGroup>
        <DevTool
          control={
            form.control as unknown as Control<TFieldValues, any, TFieldValues>
          }
          placement='top-left'
        />
      </form>
    </FormProvider>
  );
}

export default FormAddEditWrapper;
