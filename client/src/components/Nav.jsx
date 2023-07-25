import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="my-3 flex justify-between px-10 py-4">
      <h1 className="text-4xl font-bold">
        <Link to={isAuthenticated ? "/bites" : "/"}>Lydia</Link>
      </h1>
      <ul className="flex gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="text-slate-800">Welcome {user.username}</li>
            <li>
              <Link
                to="/bites/add"
                className="rounded bg-blue-500 p-2 text-center text-white hover:bg-blue-600 focus:outline-none"
              >
                Add Bite
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
