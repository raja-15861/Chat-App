import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function protectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const profileUser = useSelector((state) => state.profile?.user);

  // Also fall back to localStorage so a page refresh doesn't log the user out
  const hasAuth = token || profileUser || localStorage.getItem("token");

  if (hasAuth) {
    return children;
  }
  return <Navigate to="/signup" />;
}

export default protectedRoute;

