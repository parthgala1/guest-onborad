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

// App Component
const App = () => {
  const { authUser } = useAuthContext();
  const queryClient = new QueryClient();
  console.log("authUser", authUser);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/admin" element={<MainAdminDashboard />} />
        <Route path="/guest-admin" element={<GuestAdminDashboard />} />
        <Route
          path="/guest-registration/:hotelId"
          element={<GuestLandingPage />}
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route
          path={"/login"}
          element={!authUser ? <LoginPage /> : <Navigate to="/admin" replace />}
        />
        <Route
          path={"/register"}
          element={
            !authUser ? <RegisterPage /> : <Navigate to="/admin" replace />
          }
        />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
