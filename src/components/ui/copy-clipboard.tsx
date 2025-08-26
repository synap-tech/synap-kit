import React from 'react';

import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Clipboard } from 'lucide-react';
import { toast } from 'sonner';

const CopyClipboard: React.FC<{
  text: string;
}> = ({ text }) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text);
    toast.success(`${text} copied`);
  };

  return <Clipboard size={14} onClick={handleCopy(text)} />;
};

export default CopyClipboard;
