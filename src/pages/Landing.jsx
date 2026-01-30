import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-slate-900 to-slate-700 text-white">

      <h1 className="text-5xl font-bold mb-4 animate-pulse">
        Welcome to Financial Twin
      </h1>

      <p className="text-lg mb-8 text-gray-300">
        Your personal digital mirror for smarter financial decisions
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg"
      >
        Get Started
      </button>

    </div>
  );
}

export default Landing;
