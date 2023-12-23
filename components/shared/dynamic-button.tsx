import React, { useState, useEffect } from "react";

type ButtonProps = {
  selected: boolean;
  onClick: () => void;
  unClickText: string;
  clickText: string;
  className?: string;
};

const DynamicButton: React.FC<ButtonProps> = ({
  selected,
  onClick,
  unClickText,
  clickText,
  className = "",
}) => {
  // Introduce a local state to manage the rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Once the component mounts, update the state to trigger a re-render
    setIsClient(true);
  }, []);

  // Determine the button style based on the `saved` prop
  // and whether we're on the client-side
  const buttonStyle =
    isClient && selected
      ? "bg-gray-600 text-white border-gray-600"
      : "bg-transparent text-gray-600 border-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${className} rounded-sm border py-0.5 px-3 font-default uppercase ${buttonStyle} text-xs font-500 tracking-wide hover:outline-none hover:ring-2 hover:ring-gray-600 hover:ring-opacity-50 2xl:text-lg`}
    >
      {isClient ? (selected ? `${unClickText}` : `${clickText}`) : "Loading..."}
    </button>
  );
};

export default DynamicButton;
