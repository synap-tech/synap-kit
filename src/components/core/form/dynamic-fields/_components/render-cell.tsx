import React, { Fragment } from 'react';

import CoreForm from '@/components/core/form';
import { FormField } from '@/components/ui/form';

import type { DynamicFieldsProps } from '../types';

const RenderCell: React.FC<
  Pick<DynamicFieldsProps, 'fieldName' | 'startIndex' | 'form'> & {
    fieldDef: DynamicFieldsProps['fieldDefs'][number];
    fieldIndex: number;
    field: any;
  }
> = ({ fieldName, startIndex = 0, form, fieldDef, fieldIndex, field }) => {
  return (
    <Fragment>
      {fieldDef.type === 'readOnly' &&
        field[fieldDef.accessorKey as keyof typeof field]}

      {fieldDef.type === 'custom' && fieldDef.component(fieldIndex)}

      {fieldDef.type === 'join-input-unit' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.JoinInputUnit
              unit={fieldDef.unit(fieldIndex + startIndex)}
              disableLabel
              disabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              type={fieldDef.inputType}
              {...props}
            />
          )}
        />
      )}

      {fieldDef.type === 'text' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.Input
              type={'text'}
              disableLabel
              disabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              placeholder={fieldDef.placeholder}
              {...props}
            />
          )}
        />
      )}
      {fieldDef.type === 'checkbox' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.Checkbox
              disableLabel
              disabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              {...props}
            />
          )}
        />
      )}

      {fieldDef.type === 'date' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.DatePicker
              disableLabel
              disabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              {...props}
            />
          )}
        />
      )}

      {fieldDef.type === 'number' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.Input
              type='number'
              disableLabel
              disabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              placeholder={fieldDef.placeholder}
              {...props}
            />
          )}
        />
      )}
      {fieldDef.type === 'textarea' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.Textarea
              disableLabel
              placeholder={fieldDef.placeholder}
              disabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              {...props}
            />
          )}
        />
      )}

      {fieldDef.type === 'select' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.ReactSelect
              menuPortalTarget={document.body}
              options={fieldDef.options}
              placeholder={fieldDef.placeholder}
              disableLabel
              unique={fieldDef.unique}
              excludeOptions={fieldDef.excludeOptions}
              isDisabled={
                typeof fieldDef.disabled === 'boolean'
                  ? fieldDef.disabled
                  : fieldDef.disabled?.(fieldIndex + startIndex)
              }
              onChange={fieldDef.onChange}
              {...props}
            />
          )}
        />
      )}
      {fieldDef.type === 'radio' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.Radio
              options={fieldDef.options}
              placeholder={fieldDef.placeholder}
              disableLabel
              onChange={fieldDef.onChange}
              {...props}
            />
          )}
        />
      )}

      {fieldDef.type === 'image' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.FileUpload
              baseUrl={fieldDef.baseUrl}
              disableLabel={true}
              isUpdate={fieldDef.isUpdate}
              {...props}
            />
          )}
        />
      )}

      {fieldDef.type === 'file' && (
        <FormField
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${
            fieldDef.accessorKey
          }`}
          render={(props) => (
            <CoreForm.FileUpload
              baseUrl={fieldDef.baseUrl}
              fileType='document'
              disableLabel={true}
              errorText='File must be less than 10MB and of type pdf, doc, docx'
              options={{
                maxSize: 10000000,
              }}
              small={true}
              isUpdate={fieldDef.isUpdate}
              {...props}
            />
          )}
        />
      )}
    </Fragment>
  );
};

export default RenderCell;
