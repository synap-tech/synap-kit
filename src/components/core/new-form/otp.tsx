import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { cn } from '@/lib/utils';

import { FormBase } from './_helper/form-base';
import type { FormOtpInput } from './types';

const FormOtp: FormOtpInput = ({
  fieldProps,
  disabled,
  className,
  placeholder = 'Write here',
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <InputOTP
          placeholder={placeholder}
          className={cn('w-full', className)}
          disabled={disabled}
          maxLength={fieldProps.maxLength}
          minLength={fieldProps.minLength}
          pattern={fieldProps.pattern}
          {...field}
        >
          <InputOTPGroup>
            {[...Array(fieldProps.maxLength).keys()].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className='w-[2.05rem] md:w-[2.25rem]'
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      )}
    </FormBase>
  );
};

export default FormOtp;
