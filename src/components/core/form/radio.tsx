import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import type { FormRadioProps } from './types';

const FormRadio: React.FC<FormRadioProps> = ({
  field,
  label,
  optional = false,
  className,
  disabled = false,
  disableLabel,
  subLabel,
  value,
  onValueChange,
  options,
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
      <FormControl className=''>
        <RadioGroup
          disabled={disabled}
          onValueChange={onValueChange ?? field.onChange}
          value={value ?? field.value}
          className={cn('flex gap-x-4', className)}
        >
          {options.map((option) => (
            <FormItem key={option.value} className='flex items-start gap-x-2'>
              <FormControl>
                <RadioGroupItem value={option.value as string} />
              </FormControl>
              <FormLabel className='!m-0 !p-0 font-normal'>
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormRadio;
