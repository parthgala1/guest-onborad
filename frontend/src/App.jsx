import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainAdminDashboard } from "@/components/MainAdminDashboard";
import { GuestAdminDashboard } from "@/components/GuestAdminDashboard";
import { GuestLandingPage } from "@/components/GuestLandingPage";
import { LoginPage } from "@/components/Login";
import { RegisterPage } from "@/components/Register";
import { useAuthContext } from "./context/AuthContext";
import HotelPage from "./components/HotelPage";
import ThankYou from "./components/ThankYou";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authUser.userType)) {
    // Redirect based on user role
    const redirectPath =
      authUser.userType === "main-admin" ? "/admin" : "/guest-admin";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// App Component
const App = () => {
  const { authUser } = useAuthContext();
  const queryClient = new QueryClient();
  console.log("authUser", authUser);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["main-admin"]}>
              <MainAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guest-admin"
          element={
            <ProtectedRoute allowedRoles={["guest-admin"]}>
              <GuestAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/guest-registration/:hotelId"
          element={<GuestLandingPage />}
        />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/hotel/:hotelId" element={<HotelPage />} />
        <Route
          path="/login"
          element={
            !authUser ? (
              <LoginPage />
            ) : (
              <Navigate
                to={authUser.role === "main-admin" ? "/admin" : "/guest-admin"}
                replace
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            !authUser ? (
              <RegisterPage />
            ) : (
              <Navigate
                to={authUser.role === "main-admin" ? "/admin" : "/guest-admin"}
                replace
              />
            )
          }
        />

        {/* Root Route */}
        <Route
          path="/"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate
                to={authUser.role === "main-admin" ? "/admin" : "/guest-admin"}
                replace
              />
            )
          }
        />

        {/* Catch all route */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                authUser
                  ? authUser.role === "main-admin"
                    ? "/admin"
                    : "/guest-admin"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
