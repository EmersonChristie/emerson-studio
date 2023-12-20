// responsive heading text component with wide letter spacing

// Path: components/shared/headingText.tsx

const HeadingText = ({ className = "", text = "" }) => {
  return (
    <h1
      className={`${className} font-unicaone md:text-md font-500 uppercase leading-10 tracking-wide text-gray-700 md:tracking-wider lg:text-lg 2xl:text-2xl`}
    >
      {text}
    </h1>
  );
};

export default HeadingText;
