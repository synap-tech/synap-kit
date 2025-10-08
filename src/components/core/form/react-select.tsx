import { isArray } from 'lodash-es';

import { FormControl } from '@/components/ui/form';
import ReactSelect from '@/components/ui/react-select';
import { Skeleton } from '@/components/ui/skeleton';

import FormItemWrapper from './form-item-wrapper';
import type { FormReactSelectProps, IFormSelectOption } from './types';

const FormReactSelect: React.FC<FormReactSelectProps> = ({
  field,
  label,
  placeholder = 'Select an option',
  optional = false,
  options,
  isDisabled = false,
  disableLabel,
  isMulti = false,
  menuPortalTarget,
  valueType = 'string',
  isLoading = false,
  required,
  info,
  subLabel,
  onChange,
}) => {
  return (
    <FormItemWrapper
      label={label}
      disableLabel={disableLabel}
      subLabel={subLabel}
      optional={optional}
      required={required}
      info={info}
    >
      <FormControl>
        {isLoading ? (
          <Skeleton className='bg-input/30 h-9 w-full rounded border border-input' />
        ) : (
          <ReactSelect
            className='min-w-48 !h-9'
            isMulti={isMulti}
            options={options}
            isDisabled={isDisabled}
            placeholder={placeholder}
            menuPortalTarget={menuPortalTarget}
            {...field}
            value={
              isMulti
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
                onChange(option, field);
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
                field.onChange(option.map((item: any) => item.value));

                return;
              }

              if (valueType === 'number') {
                field.onChange(Number(option.value));
              } else {
                field.onChange(option.value);
              }
            }}
          />
        )}
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormReactSelect;
