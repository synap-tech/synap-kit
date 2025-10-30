import type React from 'react';

import type { IFormSelectOption } from '@/types';
import type { OTPInputProps } from 'input-otp';
import type { DayPickerProps } from 'react-day-picker';
import type {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import type ReactQuill from 'react-quill-new';
import { type Props as ReactSelectProps } from 'react-select';
import type { Mask, Options } from 'use-mask-input';

import type { CheckboxProps } from '@/components/ui/checkbox';
import type { InputProps } from '@/components/ui/input';
import type { RadioGroupProps } from '@/components/ui/radio-group';
import type { SelectProps } from '@/components/ui/select';
import type { SwitchProps } from '@/components/ui/switch';
import type { TextareaProps } from '@/components/ui/textarea';

import type { FormControlFunc } from './_helper/form-base';

export type FormInput = FormControlFunc<{
  fieldProps?: InputProps;
}>;
export type FormOtpInput = FormControlFunc<{
  fieldProps: OTPInputProps;
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
export type FormPhone = FormControlFunc<{
  fieldProps?: InputProps;
}>;

export type FormTextarea = FormControlFunc<{
  fieldProps?: TextareaProps;
}>;

export type FormRichTextEditor = FormControlFunc<{
  fieldProps?: React.ComponentProps<typeof ReactQuill>;
}>;

export type FormCheckbox = FormControlFunc<{
  fieldProps?: CheckboxProps;
}>;
export type FormSwitch = FormControlFunc<{
  fieldProps?: SwitchProps;
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

export type FormGender = FormControlFunc<{
  fieldProps?: SelectProps;
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
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onSubmit(values: TFieldValues): void;
  title?: string;
  isSubmitDisable?: boolean;
};
