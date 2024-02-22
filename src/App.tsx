import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SignUp from './app/SignUp';
import SignIn from './app/SignIn';
import Home from './app/Hompage';
import Dashboard from './app/Dashboard';
import Schedule from './app/Schedule';
import Chat from './app/Chat';
import Activty from './app/Activty';
import Emergency from './app/Emergency';
import Profile from './app/Profile';
import Settings from './app/Settings';
import Notification  from './app/Notification'
import Sidenav from './app/components/Sidenav';
 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/signin",
      element: <SignIn />
    },

    {
      path: "/dashboard",
      element: <Dashboard />
    },

    {
      path: "/schedule",
      element: <Schedule />
    },

    {
      path: "/signin",
      element: <SignIn />
    },

    {
      path: "/chat",
      element: <Chat />
    },

    {
      path: "/activity",
      element: <Activty />
    },

    {
      path: "/emergency",
      element: <Emergency />
    },

    {
      path: "/profile",
      element: <Profile />
    },

    {
      path: "/settings",
      element: <Settings />
    },
    {
      path: "/notification",
      element: <Notification />
    },
  ]);

  return (
    // <Sidenav /> {/* Include Navbar component outside RouterProvider */}
    <RouterProvider router={router} />
    
  );
}

export default App;
