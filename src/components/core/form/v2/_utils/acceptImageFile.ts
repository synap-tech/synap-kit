import type { Accept } from 'react-dropzone';

import type { FileType } from '../types';

export function acceptImageFile(type: FileType): Accept {
  return type === 'image'
    ? { 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp'] }
    : type === 'video'
      ? { 'video/*': ['.mp4', '.mov', '.wmv', '.flv', '.avi'] }
      : type === 'audio'
        ? { 'audio/*': ['.mp3', '.wav', '.ogg'] }
        : type === 'document'
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
          : type === 'all'
            ? {}
            : {};
}
