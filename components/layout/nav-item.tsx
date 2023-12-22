import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

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

  return (
    <Link
      href={href}
      key={key}
      onClick={handleItemClick}
      className="flex items-center justify-center py-6 text-4xl tracking-wide md:py-16 md:text-7xl lg:text-8xl xl:text-9xl"
    >
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.05, x: -15 }}
        whileTap={{ scale: 0.95 }}
        key={id}
        className={`flex  ${
          router.pathname === href
            ? "text-gray-100 line-through"
            : "text-gray-400"
        }`}
      >
        <p className="text-center leading-3"> {title} </p>
      </motion.li>
    </Link>
  );
}
