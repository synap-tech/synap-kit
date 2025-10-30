import AddEditWrapper from './add-edit-wrapper';
import * as Checkbox from './checkbox';
import * as DatePicker from './date-picker';
import * as Gender from './gender';
import * as Input from './input';
import * as FromInputMask from './input-mask';
import * as JoinInputSelect from './join-input-select';
import * as JoinInputUnit from './join-input-unit';
import * as MultiSelect from './multi-select';
import * as Otp from './otp';
import * as Phone from './phone';
import * as Radio from './radio';
import * as ReactSelect from './react-select';
import * as RichTextEditor from './rich-text-editor';
import * as Section from './section';
import * as Select from './select';
import * as Submit from './submit';
import * as Switch from './switch';
import * as Textarea from './textarea';

const NewForm = {
  Input: Input.default,
  Textarea: Textarea.default,
  InputMask: FromInputMask.default,
  Phone: Phone.default,
  Submit: Submit.default,
  Section: Section.default,
  Checkbox: Checkbox.default,
  Switch: Switch.default,
  DatePicker: DatePicker.default,
  Radio: Radio.default,
  Select: Select.default,
  Otp: Otp.default,
  MultiSelect: MultiSelect.default,
  ReactSelect: ReactSelect.default,
  JoinInputUnit: JoinInputUnit.default,
  JoinInputSelect: JoinInputSelect.default,
  RichTextEditor: RichTextEditor.default,
  Gender: Gender.default,
  AddEditWrapper,
};

export default NewForm;
