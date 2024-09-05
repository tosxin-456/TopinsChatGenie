import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import "./App.css";
import SignUp from "./app/SignUp";
import SignIn from "./app/SignIn";
import Home from "./app/Hompage";
import Dashboard from "./app/Dashboard";
import Profile from "./app/Profile";
import Settings from "./app/Settings";
import Sidenav from "./app/components/Sidenav";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Home Page */}
        <Route index element={<Home />} />

        {/* Authentication Routes */}
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        {/* Routes wrapped with Sidenav */}
        <Route element={<Sidenav />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
