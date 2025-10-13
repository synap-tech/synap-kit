import { cn } from '@/lib/utils';

import SectionTitle from './section-title';

const SectionHeader: React.FC<{
  title: string;
  info?: string;
  extraHeader?: React.ReactNode;
  className?: string;
}> = ({ title, info, extraHeader, className }) => {
  return (
    <div
      className={cn(
        'bg-muted border flex flex-col gap-4 py-3 pl-4 pr-2 sm:flex-row sm:items-center rounded-t',
        className
      )}
    >
      <SectionTitle title={title} info={info} />
      {extraHeader}
    </div>
  );
};

export default SectionHeader;
