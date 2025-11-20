import type { IFormSelectOption, IFormSelectOptionGroup } from '@/types';
import { isArray } from 'lodash';

import ReactSelect from '@/components/ui/react-select';
import { Skeleton } from '@/components/ui/skeleton';

import { FormBase } from './_helper/form-base';
import type { FormReactSelectGrouped } from './types';

const FormReactSelectGroup: FormReactSelectGrouped = ({
  fieldProps,
  options,
  valueType,
  disabled,
  placeholder = 'Select an option',
  isLoading,
  onChange,
  ...props
}) => {
  const isMulti = fieldProps?.isMulti;

  const flatOptions = options
    .map((option: IFormSelectOptionGroup) => option.options)
    .flat();

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
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 999,
              }),
            }}
            {...field}
            value={
              isMulti
                ? isArray(field.value)
                  ? field.value.map((item: any) => {
                      return options.find((option: IFormSelectOptionGroup) =>
                        option.options.find(
                          (optionItem: IFormSelectOption) =>
                            optionItem.value === item
                        )
                      );
                    })
                  : []
                : flatOptions.find(
                    (item: IFormSelectOption) => item.value === field.value
                  )
            }
            onChange={(option: any) => {
              if (onChange) {
                onChange(option as IFormSelectOptionGroup, field);
                return;
              }

              if (option === null) {
                if (isMulti) {
                  field.onChange([]);
                } else {
                  field.onChange('');
                }
                return;
              }
              if (isMulti) {
                field.onChange(
                  options.map((item: IFormSelectOptionGroup) =>
                    item.options.map(
                      (optionItem: IFormSelectOption) => optionItem.value
                    )
                  )
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

export default FormReactSelectGroup;
