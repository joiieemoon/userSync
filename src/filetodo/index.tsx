import React, { useState } from "react";

const JsonDownloaderWithUpload = () => {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large! Please upload a file smaller than 2MB.");
      event.target.value = null;
      return;
    }
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
      const cleanedBase64 = fileContent.trim().replace(/\s/g, "");
      const isBase64 =
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          cleanedBase64,
        );

      if (!isBase64) {
        alert("This is not valid Base64");
        return;
      }

      const binaryString = atob(cleanedBase64);
      const realBrowserBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        realBrowserBuffer[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([realBrowserBuffer], { type: "application/json" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        "conveerted_" + (fileName.split(".")[0] || "data") + ".json";
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
    <div className="p-6 max-w-md mx-auto my-12 bg-white border border-gray-200 rounded-lg shadow-sm font-sans">
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-900 mb-1">
        Base64 to JSON Converter
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Upload a .txt or raw text file containing Base64 data.
      </p>

      {/* File Input */}
      <div className="mb-4  ">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a file
        </label>
        <input
          type="file"
          accept=" .txt.json,text/plain"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
        />
      </div>

      {/* Selected File Display */}
      {fileName && (
        <div className="mb-4 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
          Selected: <strong className="text-gray-900 ">{fileName}</strong>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleConvertAndDownload}
        disabled={!fileContent}
        className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
          fileContent
            ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Convert & Download JSON
      </button>
    </div>
  );
};

export default JsonDownloaderWithUpload;
