import { useCallback, useEffect, useState } from 'react';

import type { Theme } from '@/providers/theme-provider';

import useTheme from '@/hooks/useTheme';

import {
  ThemeToggleButton,
  useThemeTransition,
} from '../buttons/theme-toggle-button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleThemeToggle = useCallback(() => {
    const newMode: Theme = theme === 'dark' ? 'light' : 'dark';

    startTransition(() => {
      setTheme(newMode);
    });
  }, [setTheme, startTransition, theme]);

  const currentTheme = theme === 'dark' ? 'dark' : 'light';

  if (!mounted) {
    return null;
  }

  return (
    <ThemeToggleButton
      theme={currentTheme}
      onClick={handleThemeToggle}
      variant='circle'
      start='top-right'
    />
  );
}
