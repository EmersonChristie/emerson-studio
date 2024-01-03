import React from "react";
import cx from "classnames";
import { WithChildren } from "types/global";

interface SlideProps extends WithChildren {
  className?: string;
}

const Slide: React.FC<SlideProps> = ({ className, children }) => {
  return (
    <div
      className={cx(
        "flex h-screen w-full items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Slide;
