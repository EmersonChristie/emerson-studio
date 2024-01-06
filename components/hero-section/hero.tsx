import React, { useState, useEffect, ReactElement } from "react";

interface HeroSectionProps {
  slides: ReactElement[]; // Array of slide components
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const CurrentSlideComponent = slides[currentSlideIndex];

    // Clone the slide element with modified props to include the goToNextSlide callback
    const slideWithProps = React.cloneElement(CurrentSlideComponent, {
      onSlideComplete: goToNextSlide,
    });

    return () => {
      // Reset or clean up if needed when the slide changes
    };
  }, [currentSlideIndex, slides]);

  return (
    <div className="hero-container h-screen w-full ">
      {slides.length > 0 &&
        React.cloneElement(slides[currentSlideIndex], {
          onSlideComplete: goToNextSlide,
        })}
    </div>
  );
};

export default HeroSection;
