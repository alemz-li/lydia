import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BitesPage from "./pages/BitesPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import BiteFormPage from "./pages/BiteFormPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/u/:username" element={<ProfilePage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<BiteFormPage />} />
                <Route path="/bites" element={<BitesPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
