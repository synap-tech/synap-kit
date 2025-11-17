import { RouterProvider } from 'react-router/dom';

import ProfileAvatar from './components/ui/profile-avatar';
import { ThemeToggle } from './components/ui/theme-toggle';
import { AppProvider, AuthProvider } from './providers';
import { sidebarRoutes } from './routes';
import { router } from './routes/router';
import type { IAppConfig } from './types';

const { VITE_API_BASE_URL, VITE_API_IMG_URL } = import.meta.env;

function App() {
  const appConfig: IAppConfig = {
    apiBaseUrl: VITE_API_BASE_URL,
    imageApiBaseUrl: VITE_API_IMG_URL,
    sidebarRoutes,
  };

  return (
    <AppProvider
      title='Dashboard'
      config={appConfig}
      navbarActions={[
        {
          component: <ProfileAvatar />,
          order: 1,
        },
        {
          component: <ThemeToggle />,
          order: 2,
        },
      ]}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
