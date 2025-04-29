import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="h-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <Editor
        height="100%"
        defaultLanguage="html"
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
          },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          snippetSuggestions: "inline",
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "full",
          tabSize: 2,
          lineNumbers: "on",
          renderLineHighlight: "all",
          matchBrackets: "always",
        }}
      />
    </div>
  );
};

export default CodeEditor;
