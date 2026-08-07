import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Image,
  Zap,
  Shield,
  ArrowRight,
  Send,
} from "lucide-react";

function Dashboard() {
  const user = useSelector((state) => state.user?.user);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero section */}
      <div className="hero bg-gradient-to-br from-base-200 to-base-300 py-16 px-4">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10 max-w-6xl">
          <div className="flex-1 flex justify-center">
            <div className="mockup-phone border-primary/30 bg-base-300 shadow-2xl">
              <div className="camera" />
              <div className="display bg-base-100">
                <div className="artboard artboard-demo phone-1 bg-base-100 p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3 border-b border-base-300 pb-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                        {user?.fullName?.[0]?.toUpperCase() || "U"}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {user?.fullName || "Chat App"}
                      </p>
                      <p className="text-xs text-success flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-success inline-block" />
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-primary">
                        Welcome to Chat App! 👋
                      </div>
                    </div>
                    <div className="chat chat-end">
                      <div className="chat-bubble bg-base-200 text-base-content border border-base-300">
                        Hey! Let's talk in real time 🚀
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-base-300">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="input input-bordered input-sm flex-1"
                      readOnly
                    />
                    <button className="btn btn-primary btn-sm btn-circle">
                      <Send className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Welcome back,{" "}
              <span className="text-primary">
                {user?.fullName?.split(" ")[0] || "there"}!
              </span>
            </h1>
            <p className="py-6 text-lg text-base-content/70">
              Your chat dashboard is ready. Connect with friends, share images,
              and have real-time conversations — all in one place.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Link to="/chat" className="btn btn-primary gap-2">
                Start Chatting <ArrowRight className="size-4" />
              </Link>
              <Link to="/profile" className="btn btn-outline gap-2">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why you'll love it
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Zap className="size-8" />
              </div>
              <h3 className="card-title">Fast & Real-time</h3>
              <p className="text-sm text-base-content/70">
                Instant messaging with socket-based real-time updates (coming
                soon).
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">
              <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                <Image className="size-8" />
              </div>
              <h3 className="card-title">Share Images</h3>
              <p className="text-sm text-base-content/70">
                Send photos seamlessly, hosted securely on Cloudinary.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Shield className="size-8" />
              </div>
              <h3 className="card-title">Secure Auth</h3>
              <p className="text-sm text-base-content/70">
                JWT-protected sessions with httpOnly cookies keep you safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users strip */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Users className="size-8" />
            </div>
            <div className="flex-1">
              <h3 className="card-title">Connect with everyone</h3>
              <p className="text-sm text-base-content/70">
                See all registered users and start a conversation instantly.
              </p>
            </div>
            <Link to="/chat" className="btn btn-primary btn-sm">
              <MessageSquare className="size-4" /> Go to Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

