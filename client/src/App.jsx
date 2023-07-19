import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BitesPage from "./pages/BitesPage";
import ProtectedRoutes from "./ProtectedRoutes";
import BiteFormPage from "./pages/BiteFormPage";

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Nav />
          <main className="container mx-auto px-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/bites" element={<BitesPage />} />
                <Route path="/bites/add" element={<BiteFormPage />} />
                <Route path="/bites/update/:id" element={<BiteFormPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
