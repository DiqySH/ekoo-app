import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import { Protected } from "./components/protected";
import { Public } from "./components/public";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import SidebarLayout from "./layouts/sidebarLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <SidebarLayout>
          <Home />
        </SidebarLayout>
      </Protected>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Public>
        <SignIn />
      </Public>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Public>
        <SignUp />
      </Public>
    ),
  },
]);

export default router;
