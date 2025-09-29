import { RouterProvider } from 'react-router-dom';

import ProfileAvatar from './components/ui/profile-avatar';
import { AppProvider, AuthProvider } from './providers';
import { sidebarRoutes } from './routes';
import { router } from './routes/router';

const { VITE_API_BASE_URL, VITE_API_IMG_URL } = import.meta.env;

function App() {
  return (
    <AppProvider
      companyTitle='Dashboard'
      sidebarRoutes={sidebarRoutes}
      apiBaseUrl={VITE_API_BASE_URL}
      imageApiBaseUrl={VITE_API_IMG_URL}
      navbarActions={[
        {
          component: <ProfileAvatar />,
          order: 1,
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
