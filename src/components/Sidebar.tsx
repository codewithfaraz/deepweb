import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ClipLoader } from "react-spinners";
import { SignedIn, UserButton } from "@clerk/clerk-react";
interface res {
  prompt: string;
  responseFromllm: string;
}
interface SidebarProps {
  isLoading: boolean;
  prompt: string;
  llmResponse: res[] | null;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  prompt,
  isLoading,
  llmResponse,
  onPromptChange,
  onSubmit,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setError("");
    onSubmit(e);
  };

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col relative z-20 h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 p-4 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-100">DeepWeb</h1>
      </header>

      {/* LLM Response Area - Make this the only scrollable part */}
      <div className="p-4 flex-1 overflow-hidden flex flex-col relative z-20">
        <h2 className="text-gray-400 text-sm font-semibold mb-2 flex-shrink-0">
          Response:
        </h2>
        <div className="bg-gray-900 rounded-lg p-3 text-gray-300 flex-1 mb-4 whitespace-pre-line overflow-y-auto relative z-20 custom-scrollbar">
          {llmResponse && llmResponse.length > 0 ? (
            <div>
              {llmResponse.map((res, index) => {
                return (
                  <div
                    key={index}
                    className="mb-4 pb-4 border-b border-gray-700"
                  >
                    <div className="font-bold text-blue-400 mb-2">
                      Prompt: {res.prompt}
                    </div>
                    <ReactMarkdown>{res.responseFromllm}</ReactMarkdown>
                  </div>
                );
              })}
            </div>
          ) : (
            "LLM response will appear here"
          )}
        </div>
      </div>

      {/* Prompt Input - Fixed at bottom */}
      <div className="p-4 border-t border-gray-700 relative z-20 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={prompt}
            onChange={(e) => {
              onPromptChange(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter your prompt here..."
            className={`w-full p-3 border rounded-lg bg-gray-900 ${
              error ? "border-red-500" : "border-gray-700"
            } text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 relative z-20`}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="bg-blue-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full relative z-20"
          >
            {isLoading ? <ClipLoader size={20} color="#fff" /> : "Generate"}
          </button>
        </form>
      </div>
      <SignedIn>
        <div className="absolute top-4 right-4">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Sidebar;
