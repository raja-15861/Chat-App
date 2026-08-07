import { toast } from "react-hot-toast";
import { apiConnector } from "../../lib/axios";
import { messageEndpoint } from "../api";
import {
  setMessages,
  setSelectedUser,
  setUsers,
  addMessage,
  setLoading,
} from "../../slices/messageSlice";

const { GET_ALL_USERS_API, GET_MESSAGE_API, SEND_MESSAGE_API } = messageEndpoint;

// Helper to build a consistent profile image
const buildUserImage = (user) => {
  const image = user?.image || user?.profilePic;
  if (image) return image;
  const seed = user?.fullName || user?.full_name || user?.email || "user";
  return `https://api.dicebear.com/5.x/initials/svg?seed=${seed}`;
};

export const getUsersForSidebar = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API);
      console.log("GET USERS RESPONSE........", response);
      const users = (response?.data?.filteredUsers || []).map((u) => ({
        ...u,
        profilePic: buildUserImage(u),
      }));
      dispatch(setUsers(users));
    } catch (error) {
      console.log("GET USERS ERROR........", error);
      toast.error("Failed to load users");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getMessages = (userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", `${GET_MESSAGE_API}${userId}`);
      console.log("GET MESSAGES RESPONSE........", response);
      dispatch(setMessages(response?.data?.messages || []));
    } catch (error) {
      console.log("GET MESSAGES ERROR........", error);
      toast.error("Failed to load messages");
      dispatch(setMessages([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const sendMessage = (userId, text, image) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", `${SEND_MESSAGE_API}/${userId}`, {
        text,
        image,
      });
      console.log("SEND MESSAGE RESPONSE........", response);
      dispatch(addMessage(response?.data?.newMessage));
    } catch (error) {
      console.log("SEND MESSAGE ERROR........", error);
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  };
};

export const selectUser = (user) => {
  return (dispatch) => {
    dispatch(setSelectedUser(user));
  };
};
