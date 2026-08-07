import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../services/Operations/auth";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
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
    dispatch(Signup(formData.fullName, formData.email, formData.password, navigate));

    // reset form
    setFormData({
      fullName: "",
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
              <h1 className="text-3xl font-bold mt-2">Create Your Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8"
          >
            {/* fullName */}
            <div className="form-control w-full">
              <label className="label" htmlFor="fullName">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 focus:outline-none focus:border-primary transition-colors"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
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
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-primary font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* right side - branding */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary to-primary/60 text-primary-content">
        <div className="max-w-md text-center space-y-6">
          <div className="mx-auto size-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur">
            <MessageSquare className="size-10" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Join the conversation today
          </h2>
          <p className="text-primary-content/80 text-lg">
            Connect with friends, share moments, and chat in real time — all in
            one beautiful place.
          </p>
          <div className="flex flex-col gap-3 text-left bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-white" />
              <span>Simple & secure sign-up</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-white" />
              <span>Instant access to your dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-white" />
              <span>Free forever for the basics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

