// components/PageHeader.tsx
import React from "react";
import Divider from "./divider";

interface PageHeaderProps {
  title: string;
  subheading?: string;
  description?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subheading,
  description,
}) => {
  return (
    <div className="mt-3 flex flex-col pb-8 pt-28 text-left md:pb-16 md:pt-36">
      <h1 className="text-xl font-400 uppercase tracking-wider text-gray-600">
        {title}
      </h1>
      {subheading && <p className="mt-2 text-xl text-gray-600">{subheading}</p>}
      <Divider animated={true} className="py-4" />
      {description && (
        <div className="my-6">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
