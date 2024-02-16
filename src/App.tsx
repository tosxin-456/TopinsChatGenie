import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SignUp from './app/SignUp';
import SignIn from './app/SignIn';
import Home from './app/Hompage';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/signin",
      element:<SignIn/>
    },
    

  ]);

  return (
    <RouterProvider router={router}/>

   
  );
}

export default App;
