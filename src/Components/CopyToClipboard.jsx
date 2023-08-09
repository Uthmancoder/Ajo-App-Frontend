import React, { useRef, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

const CopyToClipboard = ({ text }) => {
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    inputRef.current.select();
    document.execCommand("copy");
    setIsCopied(true);
    alert("Link copied to clipboard")

    // Show the verification message for 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="d-flex align-items-center rounded-2 border justify-content-between mx-3 mt-3">
      <p
        className={`text-primary grouplink ${isCopied ? "highlight" : ""}`}
      >
        {text}
      </p>
      <button title="Copy Link" className="copy-Icon mx-2" onClick={handleCopy}>
        <AiOutlineCopy />
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
