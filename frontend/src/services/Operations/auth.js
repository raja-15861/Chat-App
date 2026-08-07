// import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { setLoading, setToken } from "../../slices/authSlices";
import { authEndpoints } from "../api";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../../lib/axios";

const { SIGNUP_API, LOGIN_API, LOGOUT_API, UPDATE_PROFILE_API } = authEndpoints;

// Helper to build a consistent profile image
const buildUserImage = (user) => {
  const image = user?.image || user?.profilePic;
  if (image) return image;
  const seed = user?.fullName || user?.full_name || user?.email || "user";
  return `https://api.dicebear.com/5.x/initials/svg?seed=${seed}`;
};

export const Signup = (fullName, email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        fullName,
        email,
        password,
      });

      console.log("SIGNUP API RESPONSE............", response);

      // Backend returns { _id, fullName, email, profilePic } (no token)
      const user = {
        _id: response.data._id,
        fullName: response.data.fullName,
        email: response.data.email,
        image: response.data.profilePic || undefined,
      };

      const userImage = buildUserImage(user);
      dispatch(setUser({ ...user, image: userImage }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, image: userImage }),
      );

      toast.success("Account created successfully! Welcome!");
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error?.response?.data?.message || "Signup Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const Login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("Logged in api response", response);

      // Backend returns: { _id, fullName, email, profilePic }
      // (JWT is stored in an httpOnly cookie; not returned in JSON)
      const user = {
        _id: response.data._id,
        fullName: response.data.fullName,
        email: response.data.email,
        image: response.data.profilePic || undefined,
      };

      const userImage = buildUserImage(user);
      dispatch(setUser({ ...user, image: userImage }));

      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, image: userImage }),
      );

      // Set token as a truthy value for protectedRoute (cookie is the real auth source)
      dispatch(setToken("cookie"));

      toast.success("Logged in successfully.");
      navigate("/ ".trim());
    } catch (error) {
      console.log("Logged In Error", error);
      toast.error(error?.response?.data?.message || "Logged in failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const Logout = () => {
  const toastId = toast.loading("Loading...");

  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGOUT_API);
      console.log("Logout api response...", response);

      // cookie cleared on backend
      toast.success("Logout Successfully...");
    } catch (error) {
      console.log("Logout error", error);
      toast.error("Something went wrong.Please try again later!");
    }

    // clear client state
    localStorage.removeItem("token");
    dispatch(setToken(null));

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

// Kept optional exports for future use
export const checkAuth = () => {
  return async (dispatch) => {
    // backend route: GET /auth/api/check (cookie-based)
    try {
      const response = await apiConnector(
        "GET",
        "http://localhost:3000/auth/api/check",
      );
      if (response?.data) {
        const user = response.data;
        const userImage = buildUserImage(user);
        dispatch(setUser({ ...user, image: userImage }));
        dispatch(setToken("cookie"));
      }
    } catch (e) {
      dispatch(setToken(null));
    }
  };
};

export const updateProfile = (profilePic) => {
  const toastId = toast.loading("Loading...");
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
        profilePic,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser(response.data?.updateUser));
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.log("upload profile error", error);
      toast.error("Something went wrong.Please try again later!");
    } finally {
      toast.dismiss(toastId);
    }
  };
};
