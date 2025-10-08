import { useCallback, useEffect, useState } from 'react';

import { Repeat } from 'lucide-react';
import { type Accept, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import CormFormLabel from '../label';
import type { FormFileUploadProps } from '../types';
import { DocumentPreview, ImagePreview, VideoPreview } from './previews';
import AllPreview from './previews/all';

const FormFileUpload: React.FC<FormFileUploadProps> = ({
  field,
  label,
  subLabel,
  optional = false,
  disabled = false,
  disableLabel,
  options,
  isUpdate,
  fileType = 'image',
  errorText = 'Image must be less than 1MB and of type png, jpg, or jpeg',
  baseUrl,
  required,
  info,
  render,
}) => {
  const form = useFormContext();

  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

  const acceptedFile: Accept =
    fileType === 'image'
      ? { 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp'] }
      : fileType === 'video'
        ? { 'video/*': ['.mp4', '.mov', '.wmv', '.flv', '.avi'] }
        : fileType === 'audio'
          ? { 'audio/*': ['.mp3', '.wav', '.ogg'] }
          : fileType === 'document'
            ? {
                'application/*': [
                  '.pdf',
                  '.doc',
                  '.docx',
                  '.xls',
                  '.xlsx',
                  '.ppt',
                  '.pptx',
                ],
              }
            : fileType === 'all'
              ? {}
              : {};

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        field.onChange(acceptedFiles[0]);
        form.clearErrors(field.name);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setPreview(null);
        form.resetField(field.name);
      }
    },
    [form, field]
  );

  useEffect(() => {
    if (isUpdate) {
      if (field.value) {
        setPreview(baseUrl + field.value);
      }
    }
  }, [isUpdate, field.value, baseUrl]);

  const { getRootProps, getInputProps, fileRejections, inputRef } = useDropzone(
    {
      onDrop,
      maxFiles: 1,
      maxSize: 10000000,
      accept: acceptedFile,
      ...options,
    }
  );

  return (
    <FormItem className='relative flex w-full flex-col space-y-1.5'>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}

      {preview && (
        <div className='absolute bottom-2 right-2 z-50 size-10'>
          <Button
            type={'button'}
            variant={'default'}
            size={'icon'}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <Repeat className='size-4' />
          </Button>
        </div>
      )}

      <FormControl>
        <div
          {...getRootProps()}
          className='flex flex-1 items-center justify-center'
        >
          <label htmlFor='dropzone-file' className='relative size-full'>
            {!render && (
              <div className='flex size-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-input/30'>
                {fileType === 'image' && <ImagePreview preview={preview} />}
                {fileType === 'video' && <VideoPreview preview={preview} />}
                {fileType === 'document' && (
                  <DocumentPreview preview={preview} />
                )}
                {fileType === 'all' && <AllPreview preview={preview} />}
              </div>
            )}
            {render && render({ preview, setPreview, field, inputRef })}
            <Input
              disabled={disabled}
              {...getInputProps()}
              type='file'
              className='hidden'
            />
          </label>
        </div>
      </FormControl>
      <FormMessage>{fileRejections.length !== 0 && errorText}</FormMessage>
    </FormItem>
  );
};

export default FormFileUpload;
