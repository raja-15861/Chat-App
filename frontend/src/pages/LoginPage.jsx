import { MessageSquare, Mail, Lock, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../services/Operations/auth";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(formData.email, formData.password, navigate));

    // reset form
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side - form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account to continue
              </p>
            </div>
          </div>

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8"
          >
            {/* email */}
            <div className="form-control w-full">
              <label className="label" htmlFor="email">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 focus:outline-none focus:border-primary transition-colors"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* password */}
            <div className="form-control w-full">
              <label className="label" htmlFor="password">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:border-primary transition-colors"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="link link-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* right side - branding */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-secondary to-secondary/60 text-secondary-content">
        <div className="max-w-md text-center space-y-6">
          <div className="mx-auto size-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur">
            <MessageSquare className="size-10" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Welcome back to the conversation
          </h2>
          <p className="text-secondary-content/80 text-lg">
            Pick up right where you left off. Your messages, your friends, your
            world — all waiting for you.
          </p>
          <div className="flex flex-col gap-3 text-left bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-white" />
              <span>Secure login with JWT cookies</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-white" />
              <span>Access your full chat history</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-white" />
              <span>Stay connected on the go</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
