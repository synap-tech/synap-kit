import { FormItem, FormMessage } from '@/components/ui/form';

import CormFormLabel from './label';

interface IItemWrapperProps {
  disableLabel?: boolean;
  label?: string;
  subLabel?: string;
  optional?: boolean;
  required?: boolean;
  info?: string;
  children: React.ReactNode;
}

const FormItemWrapper: React.FC<IItemWrapperProps> = ({
  disableLabel,
  label,
  subLabel,
  optional,
  required,
  info,
  children,
}) => {
  return (
    <FormItem className='w-full space-y-0.5'>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}
      {children}
      <FormMessage />
    </FormItem>
  );
};

export default FormItemWrapper;
