// A functional component for page layout
import React from "react";

import PageHeader from "./page-header";

interface PageLayoutProps {
  title: string;
  subHeading?: string;
  description?: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subHeading,
  description,
  children,
}) => {
  return (
    <div className="lg:py-30 flex w-full max-w-1920 flex-col px-3 py-16 md:py-28 md:px-10 xl:py-32">
      <PageHeader
        title={title}
        subheading={subHeading}
        description={description}
      />
      <div className="flex w-full flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
