import React, { useEffect, useState } from "react";

const Toast = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Make the toast visible
    setVisible(true);

    // Set a timer to close the toast after the duration
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Match transition duration for smooth exit
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 transition-transform duration-300 ease-in-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      }`}
    >
      <div className="alert alert-success bg-[#00df9a]  shadow-lg">
        <div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m1 9a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          <span className="font-mono text-white font-bold text-xl">{message}</span>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
