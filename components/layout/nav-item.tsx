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
}: {
  id: number;
  title: string;
  href: string;
  key: number;
}) {
  const router = useRouter();

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05, x: -15 }}
      whileTap={{ scale: 0.95 }}
      key={id}
      className={
        router.pathname === href
          ? "text-gray-100 line-through"
          : "text-gray-400"
      }
    >
      <Link
        href={href}
        className=" flex items-center py-2 font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
      >
        <p> {title} </p>
      </Link>
    </motion.li>
  );
}
