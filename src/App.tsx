import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Home/>} />
        <Route path='signup' element={<SignUp/>} />
        <Route path='signin' element={<SignIn/>} />
        <Route path='profile' element={<Profile/>} />
        <Route element={<Sidenav/>}>
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='schedule' element={<Schedule/>} />
          <Route path='chat' element={<Chat/>} />
          <Route path='activity' element={<Activty/>} />
          <Route path='emergency' element={<Emergency/>} />
          <Route path='settings' element={<Settings/>} />
          <Route path='notification' element={<Notification/>} />
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
    
  );
}

export default App;
