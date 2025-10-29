import type { IFormSelectOption } from '@/types';
import { isArray } from 'lodash';

import ReactSelect from '@/components/ui/react-select';
import { Skeleton } from '@/components/ui/skeleton';

import { FormBase } from './_helper/form-base';
import type { FormReactSelect } from './types';

const FormReactSelect: FormReactSelect = ({
  fieldProps,
  options,
  valueType,
  disabled,
  placeholder = 'Select an option',
  isLoading,
  isModal,
  onChange,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) =>
        isLoading ? (
          <Skeleton className='bg-input/30 h-9 w-full rounded border border-input' />
        ) : (
          <ReactSelect
            {...fieldProps}
            className='min-w-48 !h-9'
            options={options}
            isDisabled={disabled}
            placeholder={placeholder}
            menuPortalTarget={isModal ? document.body : undefined}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: isModal ? 999 : 'auto',
              }),
            }}
            {...field}
            value={
              fieldProps?.isMulti
                ? isArray(field.value)
                  ? field.value.map((item: any) => {
                      return options.find(
                        (option: IFormSelectOption) => option.value === item
                      );
                    })
                  : []
                : options?.filter(
                    (item: IFormSelectOption) => item.value === field.value
                  )
            }
            onChange={(option: any) => {
              if (onChange) {
                onChange(option as IFormSelectOption, field);
                return;
              }

              if (option === null) {
                if (fieldProps?.isMulti) {
                  field.onChange([]);
                } else {
                  field.onChange('');
                }
                return;
              }
              if (fieldProps?.isMulti) {
                field.onChange(
                  options.map((item: IFormSelectOption) => item.value)
                );

                return;
              }

              if (valueType === 'number') {
                field.onChange(Number(option.value));
              } else {
                field.onChange(option.value);
              }
            }}
          />
        )
      }
    </FormBase>
  );
};

export default FormReactSelect;
