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

  //   <div className="flex items-center justify-between bg-white p-4 rounded shadow">
  //   <img src={imgSrc} alt="Thumbnail" className="w-16 h-16 mr-4 object-cover rounded" />
  //   <p className="flex-grow text-gray-800">{text}</p>
  //   <button
  //     onClick={handleButtonClick}
  //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //     View
  //   </button>
  // </div>

  return (
    <div className="flex items-center justify-between rounded p-2">
      <img
        src={imgSrc}
        alt="Thumbnail"
        className="mr-4 h-6 w-6 rounded object-cover md:h-12 md:w-12"
      />
      <p className="flex-grow text-gray-600">{text}</p>
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
