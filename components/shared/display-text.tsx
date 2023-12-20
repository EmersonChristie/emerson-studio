import React from "react";

interface DisplayTextProps {
  color?: string;
  fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800";
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  scale?: "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90";
  className?: string;
  text?: string;
}

const DisplayText: React.FC<DisplayTextProps> = ({
  color = "text-black",
  fontWeight = "600",
  letterSpacing = "normal",
  scale = "10",
  className = "",
  text = "",
}) => {
  const weightClass = `font-${fontWeight}`;
  const spacingClass = `tracking-${letterSpacing}`;
  const scaleClass = `scale-${scale}`;

  return (
    <h1
      className={`${color} ${weightClass} ${spacingClass} ${scaleClass} ${className} font-display`}
    >
      {text}
    </h1>
  );
};

export default DisplayText;
