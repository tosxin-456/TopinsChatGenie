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
import { ThemeProvider } from "./app/ThemeContext"; // Import the ThemeProvider

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Home Page */}
        <Route index element={<Home />} />

        {/* Authentication Routes */}
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        {/* Routes wrapped with Sidenav */}
        <Route element={<Sidenav />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    )
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
