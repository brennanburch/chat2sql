import { ChatUI, DatabaseSetup, Error, Home } from '../routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/database-setup',
      element: <DatabaseSetup />,
      errorElement: <Error />,
    },
    {
      path: '/chat-ui',
      element: <ChatUI />,
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
