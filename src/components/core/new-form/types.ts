import type React from 'react';

import type { IFormSelectOption } from '@/types';
import type { DayPickerProps } from 'react-day-picker';
import type {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import { type Props as ReactSelectProps } from 'react-select';
import type { DropzoneOptions } from 'react-dropzone';
import type { Mask, Options } from 'use-mask-input';

import type { CheckboxProps } from '@/components/ui/checkbox';
import type { InputProps } from '@/components/ui/input';
import type { RadioGroupProps } from '@/components/ui/radio-group';
import type { SelectProps } from '@/components/ui/select';
import type { TextareaProps } from '@/components/ui/textarea';

import type { FormControlFunc } from './_helper/form-base';

export type FormInput = FormControlFunc<{
  fieldProps?: InputProps;
}>;

export type FormJoinInputUnit = FormControlFunc<{
  fieldProps?: InputProps;
  unit: string;
}>;

export type FormJoinInputSelect = FormControlFunc<{
  fieldProps?: InputProps;
  selectField: {
    name: string;
    options: IFormSelectOption[];
    isDisabled?: boolean;
    placeholder?: string;
  };
  valueType?: 'string' | 'number';
}>;

export type FormInputMask = FormControlFunc<{
  fieldProps?: InputProps;
  mask?: Mask;
  maskOptions?: Options;
}>;

export type FormTextarea = FormControlFunc<{
  fieldProps?: TextareaProps;
}>;

export type FormCheckbox = FormControlFunc<{
  fieldProps?: CheckboxProps;
}>;

export type FormRadio = FormControlFunc<{
  fieldProps?: RadioGroupProps;
  options: IFormSelectOption[];
}>;

export type FormSelect = FormControlFunc<{
  fieldProps?: SelectProps;
  options: IFormSelectOption[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
}>;

export type FormMultiSelect = FormControlFunc<{
  options: IFormSelectOption[];
}>;

export type FormReactSelect = FormControlFunc<{
  fieldProps?: ReactSelectProps;
  options: IFormSelectOption[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
  isModal?: boolean;
  onChange?: (
    option?: IFormSelectOption,
    field?: ControllerRenderProps<any, any>
  ) => void;
}>;

export type FormFileUpload = FormControlFunc<{
  options?: DropzoneOptions;
  isUpdate?: boolean;
  fileType?: 'image' | 'document' | 'all' | 'video' | 'audio';
  errorText?: string;
  baseUrl: string;
  small?: boolean;
  previewClassName?: string;
  render?: ({
    preview,
    setPreview,
    field,
    inputRef,
  }: {
    preview: string | ArrayBuffer | null;
    setPreview: React.Dispatch<
      React.SetStateAction<string | ArrayBuffer | null>
    >;
    field: ControllerRenderProps<any, any>;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => React.ReactNode;
}>;

export type FormDatePicker = FormControlFunc<{
  calendarProps?: DayPickerProps;
  displayFormat?: string;
}>;

export type FormSection = {
  title?: string;
  info?: string;
  children: React.ReactNode;
  className?: string;
  extraHeader?: React.ReactNode;
  extraHeaderClassName?: string;
};

export type AddEditWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues, TContext>;
  onSubmit(values: TFieldValues): void;
  title?: string;
  isSubmitDisable?: boolean;
};
