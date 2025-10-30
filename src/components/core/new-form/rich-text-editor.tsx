import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { FormBase } from './_helper/form-base';
import type { FormRichTextEditor } from './types';

const FormRichTextEditor: FormRichTextEditor = ({
  fieldProps,
  disabled,
  className,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <ReactQuill
          theme='snow'
          value={field.value}
          onChange={field.onChange}
          className={className}
          readOnly={disabled}
          {...fieldProps}
        />
      )}
    </FormBase>
  );
};

export default FormRichTextEditor;
