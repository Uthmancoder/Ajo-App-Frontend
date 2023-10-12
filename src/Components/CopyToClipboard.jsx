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
    <div className="d-flex align-items-center  justify-content-between  link  border pt-3 ">
      <p className={`text-primary grouplink ${isCopied ? "highlight" : ""}`}>
        {text}
      </p>
      <p title="Copy Link" className=" mx-2  rounded-circle border copy_btn bg-secondary text-light" onClick={handleCopy}>
        <FiCopy />
      </p>
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
