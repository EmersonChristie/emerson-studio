import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import useWindowSize from "@/lib/hooks/use-window-size";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 100, velocity: 100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 100 },
    },
  },
};

export default function NavItem({
  id,
  title,
  href,
  key,
  handleItemClick,
}: {
  id: number;
  title: string;
  href: string;
  key: number;
  handleItemClick: () => void;
}) {
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const activeColorClass = cx(
    "line-through",
    isMobile ? "text-gray-600" : "text-gray-100",
  );
  const inactiveColorClass = "text-gray-400";

  return (
    <motion.li
      variants={variants}
      key={id}
      className={cx({
        [activeColorClass]: router.pathname === href,
        [inactiveColorClass]: router.pathname !== href,
      })}
    >
      <Link
        href={href}
        key={key}
        onClick={handleItemClick}
        className="3xl:py-24 3xl:text-9xl flex items-center justify-center py-6 font-sans text-4xl font-500 uppercase
        leading-tight tracking-wide md:py-16 md:text-6xl lg:py-20 lg:text-7xl xl:py-20 xl:text-8xl"
      >
        <motion.p
          className="text-center leading-3"
          whileHover={{ scale: 1.05, x: -15 }}
          whileTap={{ scale: 0.95 }}
        >
          {title}
        </motion.p>
      </Link>
    </motion.li>
  );
}
