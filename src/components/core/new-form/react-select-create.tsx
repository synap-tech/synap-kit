import type { IFormSelectOption } from '@/types';
import getDateTime from '@/utils/getDateTime';
import { isArray } from 'lodash';

import useAuth from '@/hooks/useAuth';

import ReactSelectCreatable from '@/components/ui/react-select/react-select-creatable';
import { Skeleton } from '@/components/ui/skeleton';

import nanoid from '@/lib/nanoid';

import { FormBase } from './_helper/form-base';
import type { FormReactSelectCreate } from './types';

const FormReactSelectCreate: FormReactSelectCreate = ({
  fieldProps,
  options,
  valueType,
  disabled,
  placeholder = 'Select an option',
  isLoading,
  onChange,
  unique = false,
  excludeOptions,
  apiUrl,
  postData,
  extraPostData,
  ...props
}) => {
  const { user } = useAuth();

  return (
    <FormBase {...props}>
      {(field) =>
        isLoading ? (
          <Skeleton className='bg-input/30 h-9 w-full rounded border border-input' />
        ) : (
          <ReactSelectCreatable
            className='min-w-64 !h-9'
            isMulti={fieldProps?.isMulti}
            options={
              unique
                ? options?.filter(
                    (item: IFormSelectOption) =>
                      !excludeOptions?.includes(item.value as string)
                  )
                : options
            }
            isDisabled={disabled}
            placeholder={placeholder}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 999,
              }),
            }}
            value={
              fieldProps?.isMulti
                ? isArray(field.value)
                  ? field.value.map((item: any) => {
                      return options?.filter(
                        (option: IFormSelectOption) => option.value === item
                      );
                    })
                  : []
                : options?.filter(
                    (option: IFormSelectOption) => option.value === field.value
                  )
            }
            onChange={(option: any) => {
              if (option === null) {
                if (fieldProps?.isMulti) {
                  field.onChange([]);
                } else {
                  field.onChange('');
                }
                return;
              }
              if (fieldProps?.isMulti) {
                field.onChange(option.map((item: any) => item.value));
                return;
              }
              if (valueType === 'number') {
                field.onChange(Number(option.value));
              } else {
                field.onChange(option.value);
              }
            }}
            onCreateOption={(inputValue: string) => {
              const newOption = { label: inputValue, value: nanoid() };
              if (apiUrl && postData) {
                postData.mutateAsync({
                  url: apiUrl,
                  newData: {
                    ...extraPostData,
                    uuid: newOption.value,
                    name: inputValue,
                    created_at: getDateTime(),
                    created_by: user?.uuid,
                  },
                });

                if (valueType === 'number') {
                  field.onChange(Number(newOption.value));
                } else {
                  field.onChange(newOption.value);
                }
              } else {
                options.push(newOption);
                if (valueType === 'number') {
                  field.onChange(Number(newOption.value));
                } else {
                  field.onChange(newOption.value);
                }
              }
            }}
            isClearable
          />
        )
      }
    </FormBase>
  );
};

export default FormReactSelectCreate;
