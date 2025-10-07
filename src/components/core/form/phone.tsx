import FormInputMusk from './input-mask';
import type { FormInputMaskProps } from './types';

const FormPhone: React.FC<Omit<FormInputMaskProps, 'mask' | 'maskOptions'>> = ({
  field,
  ...props
}) => {
  return (
    <FormInputMusk
      mask='99999-999999'
      maskOptions={{
        placeholder: 'X',
        autoUnmask: true,
      }}
      placeholder='Phone Number'
      {...props}
      field={field}
    />
  );
};

export default FormPhone;
