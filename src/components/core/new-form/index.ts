import AddEditWrapper from './add-edit-wrapper';
import * as Checkbox from './checkbox';
import * as DatePicker from './date-picker';
import * as FileUpload from './file-upload';
import * as Input from './input';
import * as FromInputMask from './input-mask';
import * as JoinInputSelect from './join-input-select';
import * as JoinInputUnit from './join-input-unit';
import * as MultiSelect from './multi-select';
import * as Radio from './radio';
import * as ReactSelect from './react-select';
import * as Section from './section';
import * as Select from './select';
import * as Submit from './submit';
import * as Textarea from './textarea';

const NewForm = {
  Input: Input.default,
  Textarea: Textarea.default,
  InputMask: FromInputMask.default,
  Submit: Submit.default,
  Section: Section.default,
  Checkbox: Checkbox.default,
  DatePicker: DatePicker.default,
  Radio: Radio.default,
  Select: Select.default,
  MultiSelect: MultiSelect.default,
  ReactSelect: ReactSelect.default,
  JoinInputUnit: JoinInputUnit.default,
  JoinInputSelect: JoinInputSelect.default,
  FileUpload: FileUpload.default,
  AddEditWrapper,
};

export default NewForm;
