import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Camera, ArrowLeft, Mail, User as UserIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { updateProfile } from "../services/Operations/auth";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [uploadImage, setUploadImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    if (!uploadImage) {
      toast.error("Please select an image first.");
      return;
    }
    dispatch(updateProfile(uploadImage));
    setUploadImage(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/chat"
          className="btn btn-ghost btn-sm gap-2 mb-4"
        >
          <ArrowLeft className="size-4" /> Back to Chat
        </Link>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex flex-col items-center text-center">
              {/* avatar */}
              <div className="relative">
                <div className="avatar">
                  <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img
                      src={
                        preview ||
                        user?.image ||
                        user?.profilePic ||
                        "https://api.dicebear.com/5.x/initials/svg?seed=" +
                          (user?.fullName || "user")
                      }
                      alt={user?.fullName || "Profile"}
                    />
                  </div>
                </div>
                <label className="btn btn-primary btn-circle btn-sm absolute bottom-0 right-0 cursor-pointer">
                  <Camera className="size-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <h1 className="text-2xl font-bold mt-4">
                {user?.fullName || "Your Name"}
              </h1>
              <p className="text-base-content/60 flex items-center gap-1">
                <Mail className="size-4" /> {user?.email || "email@example.com"}
              </p>
              <p className="text-sm text-success flex items-center gap-1 mt-1">
                <span className="size-1.5 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>

            {/* upload form */}
            <form
              onSubmit={handleUploadImage}
              className="mt-6 border-t border-base-300 pt-6"
            >
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <UserIcon className="size-5 text-primary" /> Update Profile
                Picture
              </h2>

              {preview && (
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-lg border border-base-300"
                  />
                  <p className="text-sm text-base-content/60">
                    New image selected — click "Save" to upload.
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={!uploadImage}
              >
                Save Profile Picture
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

