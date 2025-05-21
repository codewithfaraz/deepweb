import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import ToggleBar from "./components/ToggleBar";
import axios from "axios";
import supabase from "./utils/supabase";
import LandingPage from "./components/LandingPage";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [username, setUsername] = useState("");
  const [screenSize, setScreenSize] = useState("laptop");
  const [isUploading, setIsUploading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML</title>
    <style>
        /* Your CSS will appear here */
    </style>
</head>
<body>
    <h1>Preview will appear here</h1>

    <!-- Your generated content will appear here -->
    
    <script>
        // Your JavaScript will appear here
    </script>
</body>
</html>`);
  type res = {
    prompt: string;
    responseFromllm: string;
  };
  // const [key, setKey] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [llmResponse, setLlmResponse] = useState<res[] | null>(null);
  const [editorActive, setEditorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated_code.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleUpload = async () => {
    setIsUploading(true);
    const blob = new Blob([generatedCode], { type: "text/html" });
    const file = new File([blob], username, { type: "text/html" });
    // const s3bucketurl = `https://faraz-learning.s3.eu-north-1.amazonaws.com/generted websites/${username}`;
    console.log(file);
    // const uploadedFile = await axios.put(s3bucketurl, file, {
    //   headers: { "Content-Type": file.type },
    // });
    const { data: uploadedFile, error } = await supabase.storage
      .from("faraz")
      .upload(`generatedcodes/${username}.html`, file, {
        cacheControl: "3600", // optional
        upsert: true, // optional: overwrite if same file exists
        contentType: "text/html",
      });
    const { data } = supabase.storage
      .from("faraz")
      .getPublicUrl(`generatedcodes/${username}.html`);
    if (!error) {
      console.log(data);
    }
    console.log(error);
    console.log(uploadedFile);
    setIsUploading(false);
    // if (uploadedFile.status === 200) {
    //   window.open(s3bucketurl, "_blank");
    // }
  };
  const handlePromptSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      // Check if prompt exists and is not empty
      if (!prompt.trim()) {
        return; // Don't proceed if prompt is empty (though we're already validating in LandingPage)
      }
      if (!username.trim()) {
        return;
      }
      console.log("Username:", username);
      // Log the prompt (for testing/debugging)
      console.log("Generating code for prompt:", prompt);
      setIsLoading(true);

      const response = await axios.post(
        "https://54.208.193.17:8000/run-agent",
        {
          prompt: prompt,
          username: username,
        }
      );

      setIsLoading(false);
      setPrompt("");
      console.log(response.data.message);
      if (response.data.message.code != "") {
        console.log(response.data.message.code);
        setGeneratedCode(response.data.message.code);
        console.log(generatedCode);
      }
      if (response.data.message) {
        setLlmResponse((prev) => [
          ...(prev || []),
          {
            prompt: prompt,
            responseFromllm: response.data.message.text_after_code || "",
          },
        ]);
      }

      if (!editorActive) {
        setEditorActive(true);
      }
    } catch (err) {
      console.log("@err", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex overflow-hidden relative">
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxZTI5M2IyMCIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiPjwvcmVjdD48L3N2Zz4=')]"></div>

      <AnimatePresence>
        {!editorActive ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <LandingPage
              username={username}
              setUsername={setUsername}
              isLoading={isLoading}
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handlePromptSubmit}
            />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex w-full relative z-10"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* Glowing border effect */}
              <div className=" -inset-[1px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg opacity-30 blur-sm"></div>
              <Sidebar
                isLoading={isLoading}
                prompt={prompt}
                llmResponse={llmResponse}
                onPromptChange={setPrompt}
                onSubmit={handlePromptSubmit}
              />
            </motion.div>

            <motion.div
              className="flex-1 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ToggleBar
                handleUpload={handleUpload}
                screenSize={screenSize}
                isUploading={isUploading}
                setScreenSize={setScreenSize}
                showPreview={showPreview}
                onToggle={setShowPreview}
                handleDownload={handleDownload}
              />

              <div className="flex-1 p-4">
                <div className="h-full relative">
                  {/* Subtle glow effect */}
                  {/* <div className="absolute -inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10 rounded-lg blur-md"></div> */}

                  {!showPreview ? (
                    <CodeEditor
                      code={generatedCode}
                      onChange={(value) => setGeneratedCode(value || "")}
                    />
                  ) : (
                    <Preview code={generatedCode} screenSize={screenSize} />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
