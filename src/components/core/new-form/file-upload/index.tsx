import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Repeat } from 'lucide-react';
import { type Accept, useDropzone } from 'react-dropzone';
import { type ControllerRenderProps, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { FormBase } from '../_helper/form-base';
import type { FormFileUpload } from '../types';
import {
  AllPreview,
  DocumentPreview,
  ImagePreview,
  VideoPreview,
} from './previews';

type FormFileUploadProps = Parameters<FormFileUpload>[0];
type FileUploadType = NonNullable<FormFileUploadProps['fileType']>;

const buildAcceptedFileType = (
  fileType: FormFileUploadProps['fileType']
): Accept => {
  switch (fileType) {
    case 'image':
      return { 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp'] };
    case 'video':
      return { 'video/*': ['.mp4', '.mov', '.wmv', '.flv', '.avi'] };
    case 'audio':
      return { 'audio/*': ['.mp3', '.wav', '.ogg'] };
    case 'document':
      return {
        'application/*': [
          '.pdf',
          '.doc',
          '.docx',
          '.xls',
          '.xlsx',
          '.ppt',
          '.pptx',
        ],
      };
    case 'all':
    default:
      return {};
  }
};

const PREVIEW_COMPONENTS: Record<
  FileUploadType,
  (props: { preview: string | ArrayBuffer | null }) => ReactNode
> = {
  image: ImagePreview,
  video: VideoPreview,
  audio: AllPreview,
  document: DocumentPreview,
  all: AllPreview,
};

const FormFileUpload: FormFileUpload = ({
  options,
  isUpdate = false,
  fileType = 'image',
  errorText = 'Image must be less than 1MB and of type png, jpg, or jpeg',
  baseUrl,
  small,
  previewClassName,
  render,
  className,
  disabled,
  ...props
}) => {
  const { clearErrors, resetField, watch } = useFormContext();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const fieldRef = useRef<ControllerRenderProps<any, any> | null>(null);
  const fieldValue = watch(props.name as any);

  useEffect(() => {
    if (
      isUpdate &&
      typeof fieldValue === 'string' &&
      fieldValue !== '' &&
      baseUrl
    ) {
      setPreview(`${baseUrl}${fieldValue}`);
      return;
    }

    if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
      setPreview(null);
    }
  }, [baseUrl, fieldValue, isUpdate]);

  const acceptedFile = useMemo<Accept>(
    () => buildAcceptedFileType(fileType),
    [fileType]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result);
        fieldRef.current?.onChange(file);
        clearErrors(props.name as any);
      };
      reader.onerror = () => {
        setPreview(null);
        if (fieldRef.current) {
          fieldRef.current.onChange(null);
        }
        resetField(props.name as any);
      };

      try {
        reader.readAsDataURL(file);
      } catch (_error) {
        setPreview(null);
        if (fieldRef.current) {
          fieldRef.current.onChange(null);
        }
        resetField(props.name as any);
      }
    },
    [clearErrors, props.name, resetField]
  );

  const { getRootProps, getInputProps, fileRejections, inputRef } = useDropzone(
    {
      onDrop,
      maxFiles: 1,
      maxSize: 10_000_000,
      accept: acceptedFile,
      ...options,
      disabled: options?.disabled ?? disabled,
    }
  );

  const PreviewComponent =
    PREVIEW_COMPONENTS[fileType ?? 'image'] ?? ImagePreview;

  return (
    <FormBase {...props}>
      {(field) => {
        fieldRef.current = field;

        return (
          <div className={cn('relative flex w-full flex-col gap-2', className)}>
            {preview && (
              <div className='absolute bottom-2 right-2 z-10'>
                <Button
                  type='button'
                  variant='default'
                  size='icon'
                  onClick={() => {
                    if (!disabled) {
                      inputRef.current?.click();
                    }
                  }}
                  disabled={disabled}
                >
                  <Repeat className='size-4' />
                </Button>
              </div>
            )}

            <div
              {...getRootProps({
                className: cn(
                  'flex flex-1 items-center justify-center',
                  small ? 'min-h-[140px]' : 'min-h-[220px]'
                ),
              })}
            >
              <label
                htmlFor={`${field.name}-dropzone-file`}
                className={cn(
                  'relative size-full',
                  small ? 'rounded-md' : 'rounded-lg',
                  previewClassName
                )}
              >
                {!render ? (
                  <div className='flex size-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-input/30'>
                    <PreviewComponent preview={preview} />
                  </div>
                ) : (
                  render({ preview, setPreview, field, inputRef })
                )}
                <Input
                  {...getInputProps({
                    id: `${field.name}-dropzone-file`,
                  })}
                  disabled={disabled}
                  type='file'
                  className='hidden'
                />
              </label>
            </div>

            {fileRejections.length > 0 && (
              <p className='text-xs text-destructive'>{errorText}</p>
            )}
          </div>
        );
      }}
    </FormBase>
  );
};

export default FormFileUpload;
