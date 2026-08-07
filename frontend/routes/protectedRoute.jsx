import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../src/services/Operations/auth";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.profile?.user);
  const [checking, setChecking] = useState(true);

  // Verify the session against the backend on mount (real auth source is the httpOnly cookie)
  useEffect(() => {
    let mounted = true;
    (async () => {
      await dispatch(checkAuth());
      if (mounted) setChecking(false);
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // While the server round-trip is in flight, show a loader instead of redirecting
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  // Gate on a real, server-verified user (profileUser is set by checkAuth on success)
  if (profileUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;

