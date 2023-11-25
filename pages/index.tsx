import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import Image from "next/image";

import Artworks from "../public/data/emersonartworks.json";

import Slider from "@/components/slider";
import Gallery from "@/components/gallery";

const Main: React.FC = () => {
  return (
    <>
      <Layout>
        {/* <Slider /> */}
        <Gallery />
      </Layout>
    </>
  );
};

export default Main;
