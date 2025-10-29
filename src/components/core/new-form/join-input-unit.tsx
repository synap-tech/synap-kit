import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

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
          <InputGroupInput
            {...field}
            {...fieldProps}
            disabled={disabled}
            className={className}
          />
          <InputGroupAddon align={'inline-end'}>
            <InputGroupText>{unit}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
};

export default FormJoinInputUnit;
