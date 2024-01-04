import React from "react";
import { SlideProps } from "types/global";

const Slide: React.FC<SlideProps> = ({ image, title, slug, onClick }) => (
  <div className="slide cursor-pointer" onClick={() => onClick(slug)}>
    <img src={image} alt={title} className="h-auto w-full" />
    <h2 className="mt-2 text-lg font-bold">{title}</h2>
    {/* Add more Tailwind classes as needed */}
  </div>
);

export default Slide;
