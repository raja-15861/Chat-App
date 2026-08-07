import { MessageSquare } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Signup } from "../services/Operations/auth";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {/* left side */}
      <div className="flex flex-col justify-center  items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 ">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1>Create Your Account</h1>
              <p>Get started with your free account.</p>
            </div>
          </div>

          {/* form  */}
          <form onSubmit={handleSubmit} className="space-y-6 border-2 border-amber-400">
            {/* fullName */}
            <div>
              <label htmlFor="fullName">FullName</label>
              <input
                type="text"
                className=""
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className=""
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className=""
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

