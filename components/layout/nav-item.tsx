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

  return (
    <motion.li
      variants={variants}
      key={id}
      className={`  ${
        router.pathname === href
          ? "text-gray-100 line-through"
          : "text-gray-500"
      }`}
    >
      <Link
        href={href}
        key={key}
        onClick={handleItemClick}
        className="flex items-center justify-center py-5 text-3xl tracking-wide
        md:py-16 md:text-5xl lg:text-6xl xl:text-7xl"
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
