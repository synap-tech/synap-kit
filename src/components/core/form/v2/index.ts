import AddEditWrapper from './add-edit-wrapper';
import * as Checkbox from './checkbox';
import * as DatePicker from './date-picker';
import * as DateTimePicker from './date-time-picker';
import * as DynamicFields from './dynamic-fields';
import * as FileUpload from './file-upload';
import * as Gender from './gender';
import * as Input from './input';
import * as FromInputMask from './input-mask';
import * as JoinInputSelect from './join-input-select';
import * as JoinInputUnit from './join-input-unit';
import * as MonthPicker from './month-picker';
import * as MultiSelect from './multi-select';
import * as Otp from './otp';
import * as Phone from './phone';
import * as Radio from './radio';
import * as ReactSelect from './react-select';
import * as ReactSelectCreate from './react-select-create';
import * as RichTextEditor from './rich-text-editor';
import * as Section from './section';
import * as Select from './select';
import * as Submit from './submit';
import * as Switch from './switch';
import * as Textarea from './textarea';
import * as TimePicker from './time-picker';

const NewForm = {
  Input: Input.default,
  Textarea: Textarea.default,
  InputMask: FromInputMask.default,
  Phone: Phone.default,
  Submit: Submit.default,
  Section: Section.default,
  Checkbox: Checkbox.default,
  Switch: Switch.default,
  Radio: Radio.default,
  Select: Select.default,
  Otp: Otp.default,
  MultiSelect: MultiSelect.default,
  ReactSelect: ReactSelect.default,
  ReactSelectCreate: ReactSelectCreate.default,
  JoinInputUnit: JoinInputUnit.default,
  JoinInputSelect: JoinInputSelect.default,
  RichTextEditor: RichTextEditor.default,
  Gender: Gender.default,
  DatePicker: DatePicker.default,
  DateTimePicker: DateTimePicker.default,
  TimePicker: TimePicker.default,
  MonthPicker: MonthPicker.default,
  FileUpload: FileUpload.default,
  DynamicFields: DynamicFields.default,
  AddEditWrapper,
};

export default NewForm;
