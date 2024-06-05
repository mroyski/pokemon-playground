import React, { useState } from 'react';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CapturedPokemon from './components/CapturedPokemon';
import CapturedPokemonDetails from './components/CapturedPokemonDetails';
import CatchPokemon from './components/CatchPokemon';
import Login from './components/Login';
import Logs from './components/Logs';
import LogContext from './lib/LogContext';
import './App.css';

const queryClient = new QueryClient();

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to={'/login/'}>Login</Link>
      </li>
      <li>
        <Link to={'/'}>Catch</Link>
      </li>
      <li>
        <Link to={'/captured/'}>Captured</Link>
      </li>
    </ul>
  );
};

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <CatchPokemon />,
      },
      {
        path: '/captured',
        element: <CapturedPokemon />,
      },
      {
        path: '/captured/:id',
        element: <CapturedPokemonDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  const [logs, setLogs] = useState([
    { timestamp: Date.now() - 1000, data: 'captured a mankey!' },
    { timestamp: Date.now() - 5000, data: 'captured a bulbasaur!' },
  ]);

  const logContextValue = { logs, setLogs };

  return (
    <React.StrictMode>
      <LogContext.Provider value={logContextValue}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Logs logs={logs} />
        </QueryClientProvider>
      </LogContext.Provider>
    </React.StrictMode>
  );
};

export default App;
