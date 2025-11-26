import { toast } from 'sonner';

import useRHF from '@/hooks/useRHF';

import NewForm from '@/components/core/form/v2';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Title } from '@/components/ui/title';

import { type INewForm, NEW_FORM_SCHEMA } from './_config/schema';
import DynamicForm from './dynamic-form';

const NewFormPage = () => {
  // const form = useRHF(NEW_FORM_SCHEMA, {});

  // async function onSubmit(data: INewForm) {
  //   toast.info('Form submitted', {
  //     description: JSON.stringify(data, null, 2),
  //   });
  // }

  return (
    <div className='max-w-7xl mx-auto py-8'>
      <DynamicForm />
    </div>
  );

  // return (
  //   <div className='bg-background p-8'>
  //     <ThemeToggle />
  //     <div className='w-7xl mx-auto border p-8 rounded bg-popover space-y-4'>
  //       <Title className='text-center '>New Form Components</Title>
  //       <NewForm.AddEditWrapper
  //         form={form}
  //         onSubmit={onSubmit}
  //         title='New Form Components Playground'
  //       >
  //         <NewForm.Section
  //           title='Basic Controls'
  //           info='Inputs composed with extra UI elements.'
  //           className='lg:grid-cols-2'
  //         >
  //           <NewForm.Input
  //             control={form.control}
  //             name='name'
  //             label='Name (Input)'
  //             fieldProps={{
  //               type: 'password',
  //             }}
  //             required
  //           />
  //           <NewForm.Textarea
  //             control={form.control}
  //             name='description'
  //             label='Description (Textarea)'
  //           />

  //           <NewForm.Input
  //             control={form.control}
  //             name='phone_number'
  //             label='Phone Number (Input)'
  //             fieldProps={{
  //               type: 'number',
  //             }}
  //             disabled
  //           />
  //           <NewForm.InputMask
  //             control={form.control}
  //             name='phone_number'
  //             label='Phone Number (Input Mask)'
  //             mask='999-99999999'
  //           />
  //           <NewForm.Phone
  //             control={form.control}
  //             name='phone_number'
  //             label='Phone Number (Phone)'
  //           />

  //           <NewForm.DatePicker
  //             control={form.control}
  //             name='birthdate'
  //             label='Birthdate (Date Picker)'
  //           />
  //           <div className='space-y-4'>
  //             <NewForm.Checkbox
  //               control={form.control}
  //               name='is_married'
  //               label='Is Married (Checkbox)'
  //             />
  //             <NewForm.Switch
  //               control={form.control}
  //               name='is_married'
  //               label='Is Married (Switch)'
  //             />

  //             <NewForm.Radio
  //               control={form.control}
  //               name='hobby'
  //               label='Hobby (Radio)'
  //               options={[
  //                 { label: 'Reading', value: 'reading' },
  //                 { label: 'Coding', value: 'coding' },
  //                 { label: 'Sleeping', value: 'sleeping' },
  //               ]}
  //             />
  //           </div>
  //         </NewForm.Section>

  //         <NewForm.Section
  //           title='Advanced Controls'
  //           info='Inputs composed with extra UI elements.'
  //           className='lg:grid-cols-2'
  //         >
  //           <div className='col-span-2'>
  //             <NewForm.RichTextEditor
  //               control={form.control}
  //               name='description'
  //               label='Description (Rich Text Editor)'
  //             />
  //           </div>
  //           <NewForm.Select
  //             control={form.control}
  //             name='favorite_food'
  //             label='Favorite Food (Select)'
  //             options={[
  //               { label: 'Pizza', value: 'pizza' },
  //               { label: 'Pasta', value: 'pasta' },
  //               { label: 'Burger', value: 'burger' },
  //             ]}
  //           />
  //           <NewForm.Gender
  //             control={form.control}
  //             name='gender'
  //             label='Gender (Gender)'
  //           />

  //           <NewForm.ReactSelect
  //             control={form.control}
  //             name='favorite_language'
  //             label='Favorite Language (React Select)'
  //             options={[
  //               { label: 'JavaScript', value: 'javascript' },
  //               { label: 'TypeScript', value: 'typescript' },
  //               { label: 'Python', value: 'python' },
  //             ]}
  //           />

  //           <NewForm.ReactSelectGroup
  //             control={form.control}
  //             name='favorite_language'
  //             label='Favorite Language (React Select Group)'
  //             options={[
  //               {
  //                 label: 'Personal & Academic Documents',
  //                 options: [
  //                   {
  //                     label: 'Curriculum Vitae (CV) / Resume',
  //                     value: 'cv_resume',
  //                   },
  //                   {
  //                     label:
  //                       'Academic Certificates (All Educational Certificates)',
  //                     value:
  //                       'academic-certificates-all-educational-certificates',
  //                   },

  //                   { label: 'SSC', value: 'ssc' },
  //                   { label: 'HSC', value: 'hsc' },
  //                   { label: 'Bachelor', value: 'bachelor' },
  //                   { label: 'Master', value: 'master' },
  //                   {
  //                     label: 'Passport',
  //                     value: 'passport',
  //                   },
  //                   {
  //                     label: 'NID',
  //                     value: 'national_id',
  //                   },
  //                   {
  //                     label: 'Driving License',
  //                     value: 'driving_license',
  //                   },
  //                 ],
  //               },
  //               {
  //                 label: 'Employment Records',
  //                 options: [
  //                   {
  //                     label: 'Previous Experience Certificates',
  //                     value: 'previous-experience-certificates',
  //                   },
  //                   {
  //                     label:
  //                       'Panel Documents (Interview/Recruitment Panel Papers)',
  //                     value:
  //                       'panel-documents-interview-recruitment-panel-papers',
  //                   },
  //                   {
  //                     label:
  //                       'Note for Application (Applicant’s Note/Justification)',
  //                     value:
  //                       'note-for-application-applicants-note-justification',
  //                   },
  //                 ],
  //               },
  //               {
  //                 label: 'Appointment & Joining Documents',
  //                 options: [
  //                   {
  //                     label: 'Appointment Letter',
  //                     value: 'appointment-letter',
  //                   },
  //                   { label: 'Joining Letter', value: 'joining-letter' },
  //                 ],
  //               },
  //               {
  //                 label: 'Employment Progress Documents',
  //                 options: [
  //                   {
  //                     label: 'Promotion Letter / Increment Letter',
  //                     value: 'promotion-letter-increment-letter',
  //                   },
  //                   {
  //                     label: 'Appreciation / Achievement / Thanks Letter',
  //                     value: 'appreciation-achievement-thanks-letter',
  //                   },
  //                   { label: 'Transfer Letter', value: 'transfer-letter' },
  //                   {
  //                     label: 'Socks Letter (Show Cause / Explanation Letter)',
  //                     value: 'socks-letter-show-cause-explanation-letter',
  //                   }, // kept label verbatim from source
  //                   {
  //                     label:
  //                       'Leave Documents (All Leave Applications & Approvals)',
  //                     value: 'leave-documents-all-leave-applications-approvals',
  //                   },
  //                 ],
  //               },
  //               {
  //                 label: 'Exit & Release Documents',
  //                 options: [
  //                   {
  //                     label: 'Resignation Letter / Termination Letter',
  //                     value: 'resignation-letter-termination-letter',
  //                   },
  //                   { label: 'Release Order', value: 'release-order' },
  //                   {
  //                     label: 'Final Experience Letter',
  //                     value: 'final-experience-letter',
  //                   },
  //                 ],
  //               },
  //             ]}
  //           />
  //           <NewForm.MultiSelect
  //             control={form.control}
  //             name='achievements'
  //             label='Achievements (Multi Select)'
  //             options={[
  //               { label: 'Achievement 1', value: 'achievement-1' },
  //               { label: 'Achievement 2', value: 'achievement-2' },
  //               { label: 'Achievement 3', value: 'achievement-3' },
  //             ]}
  //           />
  //           <NewForm.JoinInputUnit
  //             control={form.control}
  //             name='monthly_income'
  //             label='Monthly Income (Join Input Unit)'
  //             unit='USD'
  //             fieldProps={{ type: 'number', placeholder: 'Amount' }}
  //           />
  //           <NewForm.JoinInputSelect
  //             control={form.control}
  //             name='weight_value'
  //             label='Weight (Join Input Select)'
  //             fieldProps={{ type: 'number', placeholder: 'Value' }}
  //             selectField={{
  //               name: 'weight_unit',
  //               placeholder: 'Unit',
  //               options: [
  //                 { label: 'Kilograms', value: 'kg' },
  //                 { label: 'Pounds', value: 'lb' },
  //                 { label: 'Grams', value: 'g' },
  //               ],
  //             }}
  //           />
  //           <NewForm.DateTimePicker
  //             control={form.control}
  //             name='birthdate'
  //             label='Birthdate (Date Time Picker)'
  //           />
  //           <NewForm.TimePicker
  //             control={form.control}
  //             name='birthdate'
  //             label='Birthdate (Time Picker)'
  //           />
  //           <NewForm.MonthPicker
  //             control={form.control}
  //             name='birthdate'
  //             label='Birthdate (Month Picker)'
  //           />
  //           <NewForm.Otp
  //             fieldProps={{
  //               maxLength: 6,
  //             }}
  //             control={form.control}
  //             name='secret_code'
  //             label='Secret Code (OTP)'
  //           />
  //           <NewForm.FileUpload
  //             control={form.control}
  //             name='profile_photo'
  //             label='Profile Photo (File Upload)'
  //           />
  //         </NewForm.Section>
  //       </NewForm.AddEditWrapper>
  //     </div>
  //   </div>
  // );
};

export default NewFormPage;
