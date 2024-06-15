import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/rootLayout';
import DashboardLayout from './layouts/dashboardLayout';
import SignInPage from './routes/signIn';
import SignUpPage from './routes/signUp';
import DashboardPage from './routes/dashboard';
import About from './routes/about';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import IndexPage from './routes/index.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/about/*', element: <About /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [{ path: '/dashboard', element: <DashboardPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
