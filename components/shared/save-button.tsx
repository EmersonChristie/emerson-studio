import React from "react";

type ButtonProps = {
  saved: boolean;
  onClick: () => void;
};

const SaveButton: React.FC<ButtonProps> = ({ saved, onClick }) => {
  const buttonStyle = saved
    ? "bg-gray-600 text-white border-gray-600"
    : "bg-transparent text-gray-600 border-gray-600";

  return (
    <button
      onClick={onClick}
      className={` font-unicaone  ml-4 rounded-sm
      border py-0.5 px-4 uppercase ${buttonStyle} text-xs font-500 tracking-wide
      hover:outline-none hover:ring-2 hover:ring-gray-600 hover:ring-opacity-50 2xl:text-lg 3xl:text-xl 4xl:text-2xl
      `}
    >
      {saved ? "Saved" : " Save "}
    </button>
  );
};

export default SaveButton;
