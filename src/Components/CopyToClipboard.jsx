import React, { useRef, useState } from "react";
import { FiCopy } from "react-icons/fi";

const CopyToClipboard = ({ text }) => {
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    inputRef.current.select();
    document.execCommand("copy");
    setIsCopied(true);
    alert("Link copied to clipboard");

    // Show the verification message for 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="d-grid  align-items-center  justify-content-between  link  ">
      <p className={`text-primary grouplink ${isCopied ? "highlight" : ""}`}>
        {text}
      </p>
      <button title="Copy Link" className="btn btn-primary copy_btn align-right" onClick={handleCopy}>
        Copy Link
      </button>
      {/* Hidden input to facilitate copying */}
      <input
        type="text"
        readOnly
        value={text}
        ref={inputRef}
        style={{ position: "absolute", left: "-9999px" }}
      />
    </div>
  );
};

export default CopyToClipboard;
