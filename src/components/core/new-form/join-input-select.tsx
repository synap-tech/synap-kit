import { Controller } from 'react-hook-form';

import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import DeleteButton from './_helper/delete-button';
import { FormBase } from './_helper/form-base';
import type { FormJoinInputSelect } from './types';

const FormJoinInputSelect: FormJoinInputSelect = (props) => {
  const {
    fieldProps,
    selectField,
    valueType = 'string',
    className,
    disabled,
    control,
    ...rest
  } = props;

  const selectPlaceholder = selectField.placeholder ?? 'Select option';

  return (
    <FormBase {...rest} control={control}>
      {(field) => (
        <div className='flex w-full gap-2'>
          <Input
            {...field}
            {...fieldProps}
            disabled={disabled}
            className={cn('flex-1', className)}
            value={
              field.value === undefined || field.value === null
                ? ''
                : field.value
            }
            onBlur={(event) => {
              fieldProps?.onBlur?.(event);
              if (fieldProps?.type === 'number') {
                const inputValue = event.target.value.trim();
                if (inputValue.length === 0) {
                  field.onChange(null);
                } else {
                  const numericValue = Number(inputValue);
                  field.onChange(
                    Number.isNaN(numericValue) ? null : numericValue
                  );
                }
              }
            }}
          />
          <Controller
            control={control}
            name={selectField.name as any}
            render={({ field: selectController }) => {
              const normalizedValue =
                selectController.value === undefined ||
                selectController.value === null ||
                selectController.value === ''
                  ? undefined
                  : selectController.value.toString();

              return (
                <Select
                  onValueChange={(value) => {
                    const transformedValue =
                      valueType === 'number' ? Number(value) : value;
                    selectController.onChange(transformedValue);
                  }}
                  value={normalizedValue}
                  disabled={selectField.isDisabled}
                >
                  <ButtonGroup>
                    <SelectTrigger className='min-w-[140px]'>
                      <SelectValue placeholder={selectPlaceholder} />
                    </SelectTrigger>
                    {normalizedValue ? (
                      <DeleteButton
                        onClick={() => selectController.onChange('')}
                      />
                    ) : null}
                  </ButtonGroup>
                  <SelectContent>
                    {selectField.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>
      )}
    </FormBase>
  );
};

export default FormJoinInputSelect;
