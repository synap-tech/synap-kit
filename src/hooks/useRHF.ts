import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

function useRHF<T extends z.ZodRawShape>(
  schema: z.ZodObject<T> | z.ZodEffects<z.ZodObject<T>>,
  defaultValues?: any
): UseFormReturn<z.infer<typeof schema>, any, z.infer<typeof schema>> {
  type IFormType = z.infer<typeof schema>;
  const form = useForm<IFormType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return form;
}

export default useRHF;
