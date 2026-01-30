import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Welcome() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const move = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🔐 Google OAuth Redirect (Spring Boot Backend)
  function handleGoogleLogin() {
    window.location.href =
      "http://localhost:8443/oauth2/authorization/google";
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070f] text-white">

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e3a8a,_transparent_60%)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#312e81,_transparent_60%)] opacity-40" />

      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{
          left: mouse.x - 300,
          top: mouse.y - 300,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), transparent 60%)",
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl top-20 left-20 animate-pulse" />
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl bottom-20 right-20 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        <h1
          className="text-6xl md:text-7xl font-extrabold tracking-tight
          bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400
          bg-clip-text text-transparent drop-shadow-lg"
        >
          Financial Twin
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gray-300">
          Your personal AI-powered financial mirror that understands,
          predicts, and guides your money decisions.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">

          {/* Get Started */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 rounded-xl font-semibold
            bg-indigo-500 hover:bg-indigo-600
            shadow-lg hover:shadow-indigo-500/40
            transition-all hover:scale-105"
          >
            Get Started
          </button>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3
            px-8 py-4 rounded-xl font-semibold
            bg-white text-black hover:bg-gray-200
            shadow-lg transition-all hover:scale-105"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

        </div>

      </div>
    </div>
  );
}
