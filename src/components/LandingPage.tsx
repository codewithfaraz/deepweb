import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

interface LandingPageProps {
  prompt: string;
  username: string;
  isLoading: boolean;
  setPrompt: (value: string) => void;
  setUsername: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  prompt,
  isLoading,
  setPrompt,
  onSubmit,
  username,
  setUsername,
}) => {
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (!prompt.trim()) {
      if (!usernameError.trim()) {
        setUsernameError("Please enter a username");
      }
      setError("Please enter a description of your webpage");
      return;
    }
    if (!username.trim()) {
      if (!prompt.trim()) {
        setError("Please enter a description of your webpage");
      }
      setUsernameError("Please eneter a username");
      return;
    }
    setError("");
    onSubmit(e);
  };
  const { openSignIn } = useClerk();
  return (
    <div className="z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="z-50 cursor-pointer">
        <SignedOut>
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 border border-gray-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group"
            onClick={() => openSignIn()}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40 group-hover:w-full transition-all duration-1000 ease-out"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span className="relative">Continue with Google</span>
          </button>

          {/* <SignIn /> */}
        </SignedOut>
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
      <SignedIn>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Grid lines background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxZTI5M2IyMCIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiPjwvcmVjdD48L3N2Zz4=')] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 w-full"
          >
            <div className="relative inline-block mb-3">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-30"></div>
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 tracking-tight">
                DeepWeb
              </h1>
            </div>

            <div className="relative inline-block">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-1 bg-blue-500 rounded-lg blur-md opacity-20"
              ></motion.div>
              <p className="relative text-gray-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto">
                Create stunning web experiences with AI-powered code generation
              </p>
            </div>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 relative z-50"
            >
              <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-2xl border border-gray-700 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-xl"></div>
                <div className="absolute top-0 right-0 w-[140px] h-[70px] bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20 blur-xl rounded-full transform translate-x-1/4 -translate-y-1/2"></div>

                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex gap-1">
                    {["bg-red-500", "bg-yellow-500", "bg-green-500"].map(
                      (color, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${color}`}
                        ></div>
                      )
                    )}
                  </div>
                  <div className="text-xs text-blue-300 font-mono">
                    AI.prompt
                  </div>
                </div>

                <textarea
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Describe the webpage you want to create..."
                  className={`w-full p-3 sm:p-4 border rounded-lg bg-gray-900 bg-opacity-80 ${
                    error
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-700"
                  } text-cyan-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24 sm:h-36 text-base sm:text-lg font-mono relative z-30`}
                  style={{ position: "relative", zIndex: 50 }}
                />
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError("");
                  }}
                  placeholder="Username ? (if you have one enter that)"
                  className={`w-full p-3 sm:p-4 border rounded-lg bg-gray-900 bg-opacity-80 ${
                    error
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-700"
                  } text-cyan-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base sm:text-lg font-mono relative z-30`}
                  style={{ position: "relative", zIndex: 50 }}
                />
                {error && (
                  <div className="text-red-500 text-sm mt-2 font-mono">
                    {error}
                  </div>
                )}
                {usernameError && (
                  <div className="text-red-500 text-sm mt-2 font-mono">
                    {usernameError}
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-medium px-6 py-3 sm:py-4 rounded-lg shadow-lg border border-gray-700 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40 group-hover:w-full transition-all duration-1000 ease-out"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <ClipLoader color="#ffffff" size={20} />
                  ) : (
                    <span>Generate Code</span>
                  )}

                  {!isLoading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-12 text-blue-300 text-xs sm:text-sm font-mono"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>
                  Create complex web layouts, animations, or interactive
                  features
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                <span>Specify styles, themes, and responsive behaviors</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                <span>Generate complete HTML, CSS, and JavaScript code</span>
              </div>
            </div>
          </motion.div>
        </div>
      </SignedIn>
    </div>
  );
};

export default LandingPage;
