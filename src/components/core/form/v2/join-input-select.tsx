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
  const { fieldProps, selectField, className, disabled, control, ...rest } =
    props;

  const selectPlaceholder = selectField.placeholder ?? 'Select option';

  return (
    <FormBase {...rest} control={control}>
      {(field) => (
        <div className='flex rounded-md'>
          {fieldProps?.type === 'number' ? (
            <Input
              {...field}
              {...fieldProps}
              disabled={disabled}
              className={cn(
                '-me-px rounded-r-none shadow-none focus-visible:z-1',
                className
              )}
              value={
                field.value === null || field.value === '' || field.value === 0
                  ? undefined
                  : Number(field.value)
              }
              onChange={(e) => {
                field.onChange(Number(e.target.value));
              }}
              onBlur={(e) => {
                field.onChange(Number(e.target.value));
              }}
            />
          ) : (
            <Input
              {...field}
              {...fieldProps}
              disabled={disabled}
              className={cn(
                '-me-px rounded-r-none shadow-none focus-visible:z-1',
                className
              )}
              value={field.value === null ? '' : field.value}
            />
          )}

          <Controller
            control={control}
            name={selectField.name as any}
            render={({ field: selectController }) => {
              return (
                <Select
                  onValueChange={(value) => {
                    // const transformedValue =
                    //   valueType === 'number' ? Number(value) : value;
                    selectController.onChange(value);
                  }}
                  disabled={selectField.isDisabled || disabled}
                  {...selectController}
                  value={selectController?.value?.toString()}
                >
                  <ButtonGroup>
                    <SelectTrigger className='rounded-l-none shadow-none'>
                      <SelectValue placeholder={selectPlaceholder} />
                    </SelectTrigger>
                    {selectController.value ? (
                      <DeleteButton
                        disabled={disabled}
                        onClick={() => selectController.onChange('Hello')}
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
