import React from "react";
import { useRouter } from "next/router"; // Import useRouter from Next.js

interface SaveToastProps {
  imgSrc: string;
  text: string;
  slug: string;
}

const SaveToast: React.FC<SaveToastProps> = ({ imgSrc, text, slug }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(slug); // Use Next.js router to navigate
  };

  return (
    <div className="flex items-center justify-between rounded p-1 md:p-2">
      <img
        src={imgSrc}
        alt="Thumbnail"
        className="mr-4 h-8 w-8 rounded object-cover md:h-10 md:w-10"
      />
      <p className="ml-2 flex-grow text-gray-600 md:ml-6">{text}</p>
      <button
        onClick={handleButtonClick}
        className="rounded px-4 font-bold text-gray-500 hover:text-black"
      >
        View
      </button>
    </div>
  );
};

export default SaveToast;
