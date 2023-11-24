import Card from "@/components/home/card";
import Layout from "@/components/layout";
// import Layout from "@/components/layout/layout";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";

import Artworks from "../public/data/emersonartworks.json";

import Slider from "@/components/slider";

import ArtGrid from "@/components/art-grid";
export default function Home() {
  return (
    <>
      <Layout>
        <Slider />
        {/* <ArtGrid /> */}
      </Layout>
    </>
  );
}
