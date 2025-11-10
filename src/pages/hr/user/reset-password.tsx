import getDateTime from '@/utils/getDateTime';

import useRHF from '@/hooks/useRHF';

import CoreForm from '@/components/core/form/v1';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import {
  type IResetPasswordSchema,
  RESET_PASSWORD_NULL,
  RESET_PASSWORD_SCHEMA,
} from '../_config/schema';
import { type IResetPasswordProps } from '../_config/types';

const ResetPassword: React.FC<IResetPasswordProps> = ({
  open,
  setOpen,
  updatedData,
  setUpdatedData,
  updateData,
}) => {
  const form = useRHF(RESET_PASSWORD_SCHEMA, RESET_PASSWORD_NULL);

  const onClose = () => {
    setUpdatedData?.(null);
    form.reset(RESET_PASSWORD_NULL);
    setOpen((prev) => !prev);
  };

  // Submit handler
  async function onSubmit(values: IResetPasswordSchema) {
    await updateData.mutateAsync({
      url: `/hr/user/password/${updatedData?.uuid}?is_reset=true`,
      updatedData: {
        ...values,
        updated_at: getDateTime(),
      },
      onClose,
    });
  }

  return (
    <AddModal
      open={open}
      setOpen={onClose}
      title={`Reset Password - ${updatedData?.name}`}
      form={form as any}
      onSubmit={onSubmit}
    >
      <FormField
        control={form.control}
        name='pass'
        render={(props) => (
          <CoreForm.Input label='Password' type='password' {...props} />
        )}
      />

      <FormField
        control={form.control}
        name='repeatPass'
        render={(props) => (
          <CoreForm.Input
            label={`Repeat Password`}
            type={'password'}
            {...props}
          />
        )}
      />
    </AddModal>
  );
};

export default ResetPassword;
