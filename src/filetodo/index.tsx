import React, { useState } from "react";

const JsonDownloaderWithUpload = () => {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  // Handle reading the uploaded file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleConvertAndDownload = () => {
    if (!fileContent) {
      alert("Please upload a file first.");
      return;
    }

    try {
      // Clean the Base64 string from the file
      const cleanedBase64 = fileContent.trim().replace(/\s/g, "");
      const isBase64 =
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          cleanedBase64,
        );
  

      if (!isBase64) {
        alert("this is not valid Base64");
     
        return;
      }
      console.log("helllow from outside");
      // Decode Base64 to Binary
      const binaryString = atob(cleanedBase64);

      // Create Buffer
      const realBrowserBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        realBrowserBuffer[i] = binaryString.charCodeAt(i);
      }

      // Create Blob & Trigger Download
      const blob = new Blob([realBrowserBuffer], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download =
        "converted_" + (fileName.split(".")[0] || "data") + ".json";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error decoding file:", error);
      alert(
        "Invalid format. Please ensure the file contains valid Base64 data.",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 font-sans">
      <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl">
        {/* Header */}
        <h1 className="text-xl font-semibold text-white tracking-tight mb-1">
          Base64 to JSON Converter
        </h1>
        <p className="text-xs text-zinc-400 mb-6">
          Upload a .txt or raw text file containing Base64 data.
        </p>

        {/* File Input Label */}
        <label className="flex flex-col items-center justify-center w-full h-32 border border-zinc-700 border-dashed rounded-md cursor-pointer bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-500 transition-colors">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-sm font-medium text-zinc-300 mb-1">
              Click to upload file
            </span>
            <span className="text-xs text-zinc-500">
              Supports .txt, .log, or plain text
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".log,.json,text/plain"
            onChange={handleFileUpload}
          />
        </label>

        {/* Selected File Display */}
        {fileName && (
          <div className="mt-4 text-xs font-mono bg-black text-zinc-400 p-2.5 rounded border border-zinc-800 truncate">
            Selected: <span className="text-white">{fileName}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleConvertAndDownload}
          disabled={!fileContent}
          className={`w-full mt-4 py-2.5 text-sm font-medium rounded transition-colors ${
            fileContent
              ? "bg-white text-black hover:bg-zinc-200 cursor-pointer"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          Convert & Download JSON
        </button>
      </div>
    </div>
  );
};

export default JsonDownloaderWithUpload;
