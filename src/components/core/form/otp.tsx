import { FormControl } from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import type { FormOtpProps } from './types';

const FormOTP: React.FC<FormOtpProps> = ({
  maxLength,
  minLength,
  pattern,
  field,
  label,
  subLabel,
  placeholder = 'Write here',
  optional = false,
  className,
  disabled = false,
  disableLabel,
  required,
  info,
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
        <InputOTP
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          placeholder={placeholder}
          className={cn('w-full', className)}
          disabled={disabled}
          {...field}
        >
          <InputOTPGroup>
            {[...Array(maxLength).keys()].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className='w-[2.05rem] md:w-[2.25rem]'
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormOTP;
