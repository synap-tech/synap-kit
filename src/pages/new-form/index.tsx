import { toast } from 'sonner';

import useRHF from '@/hooks/useRHF';

import NewForm from '@/components/core/new-form';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Title } from '@/components/ui/title';

import { type INewForm, NEW_FORM_SCHEMA } from './_config/schema';

const NewFormPage = () => {
  const form = useRHF(NEW_FORM_SCHEMA, {});

  async function onSubmit(data: INewForm) {
    toast.info('Form submitted', {
      description: JSON.stringify(data, null, 2),
    });
  }

  return (
    <div className='bg-background p-8'>
      <ThemeToggle />
      <div className='w-7xl mx-auto border p-8 rounded bg-popover '>
        <Title className='text-center '>New Form Components</Title>
        <NewForm.AddEditWrapper
          form={form}
          onSubmit={onSubmit}
          title='New Form Components Playground'
        >
          <NewForm.Section className='lg:grid-cols-2'>
            <NewForm.Input
              control={form.control}
              name='name'
              label='Name (Input)'
              required
            />
            <NewForm.Textarea
              control={form.control}
              name='description'
              label='Description (Textarea)'
            />
            <NewForm.InputMask
              control={form.control}
              name='phone_number'
              label='Phone Number (Input Mask)'
              mask='999-99999999'
            />
            <NewForm.Checkbox
              control={form.control}
              name='is_married'
              label='Is Married (Checkbox)'
            />
            <NewForm.DatePicker
              control={form.control}
              name='birthdate'
              label='Birthdate (Date Picker)'
            />
            <NewForm.Radio
              control={form.control}
              name='hobby'
              label='Hobby (Radio)'
              options={[
                { label: 'Reading', value: 'reading' },
                { label: 'Coding', value: 'coding' },
                { label: 'Sleeping', value: 'sleeping' },
              ]}
            />
          </NewForm.Section>

          <NewForm.Section
            title='Advanced Controls'
            info='Inputs composed with extra UI elements.'
            className='lg:grid-cols-2'
          >
            <NewForm.Select
              control={form.control}
              name='favorite_food'
              label='Favorite Food (Select)'
              options={[
                { label: 'Pizza', value: 'pizza' },
                { label: 'Pasta', value: 'pasta' },
                { label: 'Burger', value: 'burger' },
              ]}
            />
            <NewForm.ReactSelect
              control={form.control}
              name='favorite_language'
              label='Favorite Language (React Select)'
              options={[
                { label: 'JavaScript', value: 'javascript' },
                { label: 'TypeScript', value: 'typescript' },
                { label: 'Python', value: 'python' },
              ]}
            />
            <NewForm.MultiSelect
              control={form.control}
              name='achievements'
              label='Achievements (Multi Select)'
              options={[
                { label: 'Achievement 1', value: 'achievement-1' },
                { label: 'Achievement 2', value: 'achievement-2' },
                { label: 'Achievement 3', value: 'achievement-3' },
              ]}
            />
            <NewForm.JoinInputUnit
              control={form.control}
              name='monthly_income'
              label='Monthly Income (Join Input Unit)'
              unit='USD'
              fieldProps={{ type: 'number', placeholder: 'Amount' }}
            />
            <NewForm.JoinInputSelect
              control={form.control}
              name='weight_value'
              label='Weight (Join Input Select)'
              fieldProps={{ type: 'number', placeholder: 'Value' }}
              selectField={{
                name: 'weight_unit',
                placeholder: 'Unit',
                options: [
                  { label: 'Kilograms', value: 'kg' },
                  { label: 'Pounds', value: 'lb' },
                  { label: 'Grams', value: 'g' },
                ],
              }}
            />
            <NewForm.FileUpload
              control={form.control}
              name='profile_image'
              label='Profile Image (File Upload)'
              baseUrl=''
              fileType='image'
              errorText='Image must be less than 10MB and of type png, jpg, jpeg'
              options={{ maxSize: 10_000_000 }}
            />
          </NewForm.Section>
        </NewForm.AddEditWrapper>
      </div>
    </div>
  );
};

export default NewFormPage;
