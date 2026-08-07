import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Send,
  Search,
  MessageSquare,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../services/Operations/message";

function Chat() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.user);
  const { users, messages, selectedUser, loading } = useSelector(
    (state) => state.message,
  );
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getUsersForSidebar());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectUser = (user) => {
    setText("");
    setImage(null);
    setImagePreview(null);
    // store selected user in the slice (messages load via useEffect on selectedUser)
    dispatch({ type: "message/setSelectedUser", payload: user });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImage(dataUrl);
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      toast.error("Select a user to start chatting.");
      return;
    }
    if (!text.trim() && !image) {
      toast.error("Type a message or attach an image.");
      return;
    }
    dispatch(sendMessage(selectedUser._id, text.trim(), image || null));
    setText("");
    setImage(null);
    setImagePreview(null);
  };

  const filteredUsers = users.filter((u) => {
    const name = `${u.fullName || ""} ${u.email || ""}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-[calc(100vh-6rem)] bg-base-200 p-4">
      <div className="mx-auto max-w-6xl h-full bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden flex">
        {/* ---------- Sidebar ---------- */}
        <aside className="w-full sm:w-80 lg:w-96 border-r border-base-300 flex flex-col bg-base-100">
          {/* current user */}
          <div className="p-4 border-b border-base-300 flex items-center gap-3 bg-base-100">
            <div className="avatar">
              <div className="w-11 rounded-full">
                <img
                  src={
                    currentUser?.image ||
                    currentUser?.profilePic ||
                    "https://api.dicebear.com/5.x/initials/svg?seed=user"
                  }
                  alt={currentUser?.fullName || "You"}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {currentUser?.fullName || "You"}
              </p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
            <Link to="/profile" className="btn btn-ghost btn-sm">
              <MessageSquare className="size-4" /> Profile
            </Link>
          </div>

          {/* search */}
          <div className="p-3 border-b border-base-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
              <input
                type="text"
                placeholder="Search users..."
                className="input input-bordered w-full pl-10 input-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* users list */}
          <div className="flex-1 overflow-y-auto">
            {loading && users.length === 0 ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-10 text-base-content/50 text-sm">
                No users found.
              </div>
            ) : (
              filteredUsers.map((user) => {
                const isActive = selectedUser?._id === user._id;
                return (
                  <button
                    key={user._id}
                    onClick={() => handleSelectUser(user)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors text-left ${
                      isActive ? "bg-primary/10 border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={
                            user.profilePic ||
                            "https://api.dicebear.com/5.x/initials/svg?seed=user"
                          }
                          alt={user.fullName}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.fullName}</p>
                      <p className="text-xs text-base-content/50 truncate">
                        {user.email}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* ---------- Chat area ---------- */}
        <main className="flex-1 flex flex-col bg-base-100">
          {!selectedUser ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="size-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Select a user to chat</h2>
              <p className="text-base-content/60 mt-2 max-w-sm">
                Choose a person from the sidebar and start a conversation.
              </p>
            </div>
          ) : (
            <>
              {/* chat header */}
              <div className="px-4 py-3 border-b border-base-300 flex items-center gap-3 bg-base-100">
                <button
                  className="btn btn-ghost btn-sm lg:hidden"
                  onClick={() =>
                    dispatch({ type: "message/setSelectedUser", payload: null })
                  }
                >
                  <ArrowLeft className="size-4" />
                </button>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        selectedUser.profilePic ||
                        "https://api.dicebear.com/5.x/initials/svg?seed=user"
                      }
                      alt={selectedUser.fullName}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{selectedUser.fullName}</p>
                  <p className="text-xs text-base-content/50">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              {/* messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-base-200/40 space-y-3">
                {loading && messages.length === 0 ? (
                  <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-10 text-base-content/50 text-sm">
                    No messages yet. Say hello! 👋
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMine = msg.senderId === currentUser?._id;
                    return (
                      <div
                        key={msg._id}
                        className={`chat ${isMine ? "chat-end" : "chat-start"}`}
                      >
                        <div
                          className={`chat-bubble ${
                            isMine
                              ? "chat-bubble-primary"
                              : "bg-base-100 border border-base-300"
                          }`}
                        >
                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="attachment"
                              className="rounded-lg max-w-xs mb-2"
                            />
                          )}
                          {msg.text && <p>{msg.text}</p>}
                          <div
                            className={`text-[10px] opacity-70 mt-1 ${
                              isMine ? "text-right" : ""
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* image preview */}
              {imagePreview && (
                <div className="px-4 pt-3 relative">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg border border-base-300"
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="btn btn-circle btn-xs absolute top-2 left-24 bg-base-100 border border-base-300"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* input */}
              <form
                onSubmit={handleSend}
                className="p-4 border-t border-base-300 bg-base-100 flex items-center gap-2"
              >
                <label className="btn btn-ghost btn-circle cursor-pointer">
                  <ImageIcon className="size-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input input-bordered flex-1"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-circle"
                  disabled={!text.trim() && !image}
                >
                  <Send className="size-4" />
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Chat;

