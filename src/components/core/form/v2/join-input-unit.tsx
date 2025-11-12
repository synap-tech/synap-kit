import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

import { cn } from '@/lib/utils';

import { FormBase } from './_helper/form-base';
import type { FormJoinInputUnit } from './types';

const FormJoinInputUnit: FormJoinInputUnit = ({
  fieldProps,
  disabled,
  className,
  unit,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <InputGroup>
          {fieldProps?.type === 'number' ? (
            <InputGroupInput
              {...field}
              {...fieldProps}
              disabled={disabled}
              className={cn(className)}
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
            <InputGroupInput
              {...field}
              {...fieldProps}
              disabled={disabled}
              className={cn(className)}
              value={field.value === null ? '' : field.value}
            />
          )}

          <InputGroupAddon align={'inline-end'}>
            <InputGroupText>{unit}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
};

export default FormJoinInputUnit;
