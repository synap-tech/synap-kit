import { createContext, useEffect, useMemo } from 'react';

import type { INavAction, IRoute } from '@/types';
import { Toaster } from 'sonner';

import { useLocalStorage } from '@/hooks/useStorage';
import useTheme from '@/hooks/useTheme';

import { Toast } from '@/components/ui/toast';

export interface IAppContext {
  companyTitle: string;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  sidebarRoutes: IRoute[];
  navbarActions?: INavAction[];
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

const AppProvider: React.FC<{
  children: React.ReactNode;
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  sidebarRoutes: IRoute[];
  companyTitle: string;
  navbarActions?: INavAction[];
}> = ({
  children,
  apiBaseUrl,
  imageApiBaseUrl,
  sidebarRoutes,
  companyTitle,
  navbarActions,
}) => {
  const { theme } = useTheme();
  const value = useMemo(
    (): IAppContext => ({
      apiBaseUrl,
      imageApiBaseUrl,
      sidebarRoutes,
      companyTitle,
      navbarActions,
    }),
    [apiBaseUrl, imageApiBaseUrl, sidebarRoutes, companyTitle, navbarActions]
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
