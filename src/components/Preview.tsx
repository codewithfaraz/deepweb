interface PreviewProps {
  code: string;
  screenSize: string;
  // previewKey: number;
}

const Preview: React.FC<PreviewProps> = ({ code, screenSize }) => {
  return (
    <div className="h-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex justify-center">
      <iframe
        // key={previewKey}
        srcDoc={code}
        className={`${
          screenSize === "laptop"
            ? "w-full"
            : screenSize === "mobile"
            ? "w-1/3"
            : "w-1/2"
        }  h-full rounded-lg bg-white`}
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Preview;
