import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

interface IModalWrapperProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  isSmall?: boolean;
  isLarge?: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<IModalWrapperProps> = ({
  open,
  setOpen,
  className,
  isSmall,
  isLarge,
  title,
  subtitle,
  children,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          open={open}
          onClose={() => null}
          className='relative z-50'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 backdrop-blur-sm backdrop-brightness-50'
          />
          <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-popover p-6 shadow-lg  flex flex-col gap-4',
                isSmall && 'sm:max-w-5xl',
                isLarge && 'max-w-7xl',
                className
              )}
            >
              <div className='absolute right-4 top-4'>
                <Button
                  onClick={() => setOpen(false)}
                  variant={'destructive'}
                  size={'icon'}
                  className='size-7 rounded-full'
                >
                  <X className='size-4' />
                </Button>
              </div>
              <div className=' space-y-1.5  flex flex-col '>
                <DialogTitle className='text-lg font-bold'>{title}</DialogTitle>
                <Description
                  className={cn(
                    'text-sm text-muted-foreground',
                    !subtitle && 'sr-only'
                  )}
                >
                  {subtitle}
                </Description>
              </div>
              {children}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
