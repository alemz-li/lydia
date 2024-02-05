import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useTheme from "../hooks/useTheme";

const Nav = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { handleChangeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const handleLogout = () => {
    try {
      logout();

      queryClient.removeQueries();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="mb-2 pt-4 shadow-sm dark:text-zinc-100 sm:flex sm:justify-between">
      <div className="flex items-baseline justify-between px-6">
        <div>
          <h1 className="p-4 text-4xl font-bold">
            <Link to={isAuthenticated ? "/dashboard" : "/"}>Lydia</Link>
          </h1>
        </div>
        <div className="sm:hidden">
          <button onClick={handleMenu}>
            {isOpen ? (
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2H4Zm-1 7a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } mx-2 px-2 py-4 dark:text-zinc-100 sm:flex sm:bg-none`}
      >
        {isAuthenticated ? (
          <>
            <li className="mb-4 sm:mb-0">
              Welcome{" "}
              <Link
                className="text-gray-600 hover:text-gray-700"
                to={`/u/${user.username}`}
              >
                {user.username}
              </Link>
            </li>
            <li className="mb-4 hover:text-zinc-700 dark:hover:text-zinc-400 sm:mb-0 sm:ml-4">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mb-4 hover:text-zinc-800 sm:mb-0 sm:ml-4">
              <Link to="/login">Login</Link>
            </li>
            <li className="mb-4 hover:text-zinc-800 sm:mb-0 sm:ml-4">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li className="mb-4 sm:mb-0 sm:ml-4">
          <button onClick={handleChangeTheme}>
            <svg
              className="h-6 w-6 fill-current hover:fill-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 384"
              xmlSpace="preserve"
            >
              <path d="m311.576 148.336-32-136A16.01 16.01 0 0 0 264 0H120a16.01 16.01 0 0 0-15.576 12.336l-32 136c-1.12 4.76 0 9.768 3.04 13.6A15.98 15.98 0 0 0 88 168h88v184h-48c-8.832 0-16 7.168-16 16s7.168 16 16 16h128c8.832 0 16-7.168 16-16s-7.168-16-16-16h-48V168h16v24c0 8.832 7.168 16 16 16s16-7.168 16-16v-24h40a15.98 15.98 0 0 0 12.536-6.064c3.04-3.832 4.16-8.84 3.04-13.6zM108.2 136l24.472-104h118.656L275.8 136H108.2z" />
            </svg>
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
