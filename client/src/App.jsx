import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BitesPage from "./pages/BitesPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import BiteFormPage from "./pages/BiteFormPage";

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)".matches)) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="h-screen overflow-auto bg-neutral-50 antialiased dark:bg-gray-900">
            <Nav handleChangeTheme={handleChangeTheme} />
            <main className="container mx-auto px-10">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/u/:username" element={<ProfilePage />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/bites" element={<BitesPage />} />
                  <Route path="/bites/add" element={<BiteFormPage />} />
                  <Route path="/bites/view/:id" element={<BiteFormPage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
