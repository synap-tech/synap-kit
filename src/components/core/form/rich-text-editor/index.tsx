import React from 'react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { FormControl } from '@/components/ui/form';

import FormItemWrapper from '../form-item-wrapper';
import type { FormTextareaProps } from '../types';

const FormTextarea: React.FC<FormTextareaProps> = ({
  field,
  label,
  optional = false,
  disableLabel,
  subLabel,
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
        <ReactQuill
          theme='snow'
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormTextarea;
