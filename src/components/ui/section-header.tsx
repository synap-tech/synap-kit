import { cn } from '@/lib/utils';

import SectionTitle from './section-title';

const SectionHeader: React.FC<{
  children: React.ReactNode;
  extraHeader?: React.ReactNode;
  className?: string;
}> = ({ children, extraHeader, className }) => {
  return (
    <div
      className={cn(
        'bg-base flex flex-col justify-between gap-1 py-3 pl-4 pr-2 sm:flex-row sm:items-center',
        className
      )}
    >
      <SectionTitle>{children}</SectionTitle>
      {extraHeader}
    </div>
  );
};

export default SectionHeader;
