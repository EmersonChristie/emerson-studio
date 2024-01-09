import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import { motion } from "framer-motion";
import Divider from "./divider";

const Tabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Set the active tab based on the current route
    const path = router.pathname;
    if (path.includes("/artist")) {
      setActiveTab("Artist");
    } else if (path.includes("/contact")) {
      setActiveTab("Contact");
    }
  }, [router.pathname]); // Dependency on the pathname ensures this runs when route changes

  const handleTabClick = (tabName: string, href: string) => {
    setActiveTab(tabName);
    router.push(href);
  };

  const tabs = [
    { name: "Artist", href: "/artist" },
    { name: "Contact", href: "/contact" },
  ];

  const buttonClasses = cx(
    "p-4 md:p-6 uppercase items-start hover:text-black tracking-wide text-gray-600",
  );

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <motion.div
          key={tab.name}
          className="flex flex-col items-center justify-center pb-6"
        >
          <motion.button
            key={tab.name}
            className={`md:text-md items-start p-4 uppercase tracking-wide text-gray-600 hover:text-black md:p-6 lg:text-lg xl:text-xl 2xl:text-2xl ${
              activeTab === tab.name ? "font-bold text-gray-800" : ""
            }`}
            onClick={() => handleTabClick(tab.name, tab.href)}
          >
            {tab.name}
          </motion.button>
          {activeTab === tab.name && (
            <Divider
              key={tab.name}
              animated={true}
              className="mx-auto w-full pt-0 text-gray-900"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Tabs;
