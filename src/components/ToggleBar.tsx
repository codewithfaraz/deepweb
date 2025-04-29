import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import {
  AiOutlineMobile,
  AiOutlineTablet,
  AiOutlineLaptop,
} from "react-icons/ai";
interface ToggleBarProps {
  handleDownload: () => void;

  handleUpload: () => void;
  showPreview: boolean;
  isUploading: boolean;
  setScreenSize: (size: string) => void;
  screenSize: string;
  onToggle: (show: boolean) => void;
}
const ToggleBar: React.FC<ToggleBarProps> = ({
  showPreview,
  onToggle,
  isUploading,
  handleUpload,
  setScreenSize,
  handleDownload,
  screenSize,
}) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-3 border-b border-gray-700 flex justify-between items-center relative">
      {/* Subtle glow effect */}
      <div className="absolute left-0 -bottom-[1px] right-0 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50"></div>

      <div className="flex gap-2 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 blur-sm"></div>
        <motion.button
          onClick={() => onToggle(false)}
          className={`cursor-pointer px-4 py-1.5 rounded-lg relative overflow-hidden ${
            !showPreview ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {!showPreview && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Code
          </span>
        </motion.button>

        <motion.button
          onClick={() => onToggle(true)}
          className={`cursor-pointer px-4 py-1.5 rounded-lg relative overflow-hidden ${
            showPreview ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showPreview && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            Preview
          </span>
        </motion.button>
        <motion.button
          onClick={handleDownload}
          className="cursor-pointer px-4 py-1.5 rounded-lg relative overflow-hidden text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Page
          </span>
        </motion.button>
        <motion.button
          onClick={handleUpload}
          className="cursor-pointer px-4 py-1.5 rounded-lg relative overflow-hidden text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"
              />
              <path
                d="M9 12.75l1.25 1.25V8.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            {isUploading ? <ClipLoader color="#ffffff" size={20} /> : "Deploy"}
          </span>
        </motion.button>
      </div>
      <div className="flex space-x-4">
        <AiOutlineLaptop
          size={32}
          color="#fff"
          onClick={() => setScreenSize("laptop")}
          className={`${
            screenSize === "laptop" && "border p-1"
          }  cursor-pointer`}
        />
        <AiOutlineTablet
          size={32}
          color="#fff"
          onClick={() => setScreenSize("tablet")}
          className={`${
            screenSize === "tablet" && "border p-1"
          }  cursor-pointer`}
        />
        <AiOutlineMobile
          size={32}
          color="#ffffff"
          onClick={() => setScreenSize("mobile")}
          className={`${
            screenSize === "mobile" && "border p-1"
          }  cursor-pointer`}
        />
      </div>
      <div className="flex items-center text-xs text-blue-300 font-mono gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span>AI-Generated</span>
      </div>
    </div>
  );
};

export default ToggleBar;
