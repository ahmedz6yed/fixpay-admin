import { createBrowserRouter } from "react-router-dom";

import Step1 from "../features/createAcc/Step1";
import Step2 from "../features/createAcc/Step2";
import Step3 from "../features/createAcc/Step3";
import Step4 from "../features/createAcc/Step4";
import Step5 from "../features/createAcc/Step5";
import Step6 from "../features/createAcc/Step6";
import ProtectedRoute from "../guards/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

import RegisterLayout from "../components/layout/Register/RegisterLayout";
import ChangePassword from "../features/ForgotPassword/ChangePassword";
import EmailForgotPassword from "../features/ForgotPassword/EmailForgotPassword";
import ForgotOTP from "../features/ForgotPassword/ForgotOTP";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: <RegisterLayout />,
    path: "/register",
    children: [
      { index: true, element: <Step1 /> },
      { path: "basic-info", element: <Step2 /> },
      { path: "personal-info", element: <Step3 /> },
      { path: "location-details", element: <Step4 /> },
      { path: "upload-photo", element: <Step5 /> },
      { path: "email-otp", element: <Step6 /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    children: [
      { index: true, element: <EmailForgotPassword /> },
      { path: "otp-vtf", element: <ForgotOTP /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
