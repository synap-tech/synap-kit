import { createContext, useEffect, useMemo } from 'react';

import type { IAppConfig, INavAction, IRoute } from '@/types';
import { Toaster } from 'sonner';

import { useLocalStorage } from '@/hooks/useStorage';
import useTheme from '@/hooks/useTheme';

import { Toast } from '@/components/ui/toast';

export interface IAppContext {
  config: IAppConfig;
  title: string;
  navbarActions?: INavAction[];
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

interface AppProviderProps {
  config: IAppConfig;
  title: string;
  navbarActions?: INavAction[];
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({
  children,
  config = {
    apiBaseUrl: '',
    imageApiBaseUrl: '',
    loginUrl: '/hr/user/login',
    sidebarRoutes: [],
  },
  title,
  navbarActions,
}) => {
  const { theme } = useTheme();
  const value = useMemo(
    (): IAppContext => ({
      config,
      title,
      navbarActions,
    }),
    [config, title, navbarActions]
  );

  const [fontSize] = useLocalStorage('fontSize', '13');
  const [primaryColor] = useLocalStorage('primaryColor', '');

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--primary', `${primaryColor}`);
    document.documentElement.style.setProperty('--ring', `${primaryColor}`);
  }, [fontSize, primaryColor]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toast />
      <Toaster richColors theme={theme} position={'top-center'} />
    </AppContext.Provider>
  );
};

export default AppProvider;
