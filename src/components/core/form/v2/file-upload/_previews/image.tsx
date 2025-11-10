import { ImagePlus } from 'lucide-react';

import { cn } from '@/lib/utils';

const ImagePreview: React.FC<{ preview: string | ArrayBuffer | null }> = ({
  preview,
}) => {
  return (
    <div className='flex size-full flex-col items-center justify-center p-4'>
      {preview ? (
        <img
          className='max-h-[100px] rounded-lg'
          src={preview as string}
          alt='User image'
        />
      ) : (
        <>
          <ImagePlus
            className={cn(
              `block size-7 text-foreground/50`,
              preview && 'hidden'
            )}
          />

          <p className='my-2 text-sm text-foreground/50'>
            <span className='font-semibold'>Click to upload</span> or drag and
            drop
          </p>
          <p className='text-xs text-foreground/50'>
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </>
      )}
    </div>
  );
};

export default ImagePreview;
