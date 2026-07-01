import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
