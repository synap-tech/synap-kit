import {
  BOOLEAN_REQUIRED,
  FILE,
  NUMBER_DOUBLE_OPTIONAL,
  STRING_ARRAY,
  STRING_OPTIONAL,
  STRING_REQUIRED,
} from '@/utils/validators';
import z from 'zod';

export const NEW_FORM_SCHEMA = z.object({
  name: STRING_REQUIRED,
  description: STRING_OPTIONAL,
  phone_number: STRING_REQUIRED,
  is_married: BOOLEAN_REQUIRED,
  birthdate: STRING_REQUIRED,
  hobby: STRING_REQUIRED,
  achievements: STRING_ARRAY,
  favorite_food: STRING_REQUIRED,
  favorite_language: STRING_REQUIRED,
  monthly_income: NUMBER_DOUBLE_OPTIONAL,
  weight_value: NUMBER_DOUBLE_OPTIONAL,
  weight_unit: STRING_REQUIRED,
  profile_image: FILE.optional(),
});

export type INewForm = z.infer<typeof NEW_FORM_SCHEMA>;
