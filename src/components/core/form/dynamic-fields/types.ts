import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import type { IFormSelectOption } from '../types';

type FieldReadonly = {
  type: 'readOnly';
};
type FieldCustom = {
  type: 'custom';
  component: (index: number) => React.ReactNode;
};

type FieldText = {
  type: 'text';
  // inputType?: 'text' | 'number';
  placeholder?: string;
};
type FieldTextArea = {
  type: 'textarea';
  placeholder?: string;
};
type FieldNumber = {
  type: 'number';
  placeholder?: string;
};
type FieldCheckBox = {
  type: 'checkBox';
};
type FieldSelect = {
  type: 'select';
  placeholder?: string;
  options: IFormSelectOption[];
  excludeOptions?: string[];
  unique?: boolean;

  onChange?: (option?: any, field?: any) => void;
};

type FieldRadio = {
  type: 'radio';
  placeholder?: string;
  options: IFormSelectOption[];

  onChange?: (option?: any, field?: any) => void;
};
type FieldJoinInputUnit = {
  type: 'join-input-unit';
  placeholder?: string;
  unit: (index: number) => string;

  inputType?: string;
};

type FieldImage = {
  type: 'image';
  placeholder?: string;
  isUpdate?: boolean;
  baseUrl: string;
};
type FieldFile = {
  type: 'file';
  placeholder?: string;
  isUpdate?: boolean;
  baseUrl: string;
};

type FieldCheckbox = {
  type: 'checkbox';
  placeholder?: string;
  isUpdate?: boolean;
};

type FieldDate = {
  type: 'date';
  placeholder?: string;
  isUpdate?: boolean;
};

type FieldMultiSelect = {
  type: 'multiSelect';
  placeholder?: string;
  options: IFormSelectOption[];
};

type FieldSelectCreate = {
  type: 'select-create';
  placeholder?: string;
  options: IFormSelectOption[];
};

export type FieldDef = {
  header: string;
  accessorKey: string;
  className?: string;
  isLoading?: boolean;
  hidden?: boolean;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  disabled?: boolean | ((index: number) => boolean);
} & (
  | FieldText
  | FieldNumber
  | FieldSelect
  | FieldReadonly
  | FieldCustom
  | FieldJoinInputUnit
  | FieldTextArea
  | FieldCheckBox
  | FieldMultiSelect
  | FieldSelectCreate
  | FieldImage
  | FieldCheckbox
  | FieldDate
  | FieldFile
  | FieldRadio
);

export interface DynamicFieldsProps {
  title: string | React.ReactNode;
  form: UseFormReturn<any>;
  fieldName: string;
  fieldDefs: FieldDef[];
  extraHeader?: React.ReactNode;
  handleAdd?: () => void;
  fields: FieldArrayWithId<any>[];
  viewAs?: 'default' | 'spreadsheet' | 'kanban';
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
  startIndex?: number;
}
