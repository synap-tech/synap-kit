import React from 'react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { FormControl, FormItem, FormMessage } from '@/components/ui/form';

import CormFormLabel from '../label';
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
    <FormItem className='w-full space-y-1.5'>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}
      <FormControl>
        <ReactQuill
          theme='snow'
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormTextarea;
