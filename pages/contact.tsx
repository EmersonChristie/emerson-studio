import React from "react";
import ImageSlider from "@/components/shared/image-slider";
import { contactImages } from "@/lib/contactImageData";
import {
  FADE_IN_ANIMATION_SETTINGS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/lib/constants";
import { motion } from "framer-motion";
import PageLayout from "@/components/shared/page-layout";

// Google Maps
import Script from "next/script";
import GoogleMap from "@/components/shared/GoogleMap";

const studioLocation = {
  lat: 36.4795082347957,
  lng: -121.73118473558232,
};

const ContactPage = () => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  console.log("Api key: ", GOOGLE_MAPS_API_KEY);
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`}
        strategy="beforeInteractive"
      />
      <PageLayout title="Contact">
        <div id="main-content" className="flex flex-col gap-20">
          <div id="introduction" className="flex flex-col gap-20 md:flex-row">
            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              initial="hidden"
              animate="show"
              className="md:w-1/2"
            >
              <ImageSlider images={contactImages} interval={3000} />
            </motion.div>
            <motion.div className="md:w-1/2" {...FADE_IN_ANIMATION_SETTINGS}>
              <p className="lg:text-md text-sm text-gray-600 2xl:text-lg">
                Nestled in the heart of Carmel Valley Village, Emerson Studio is
                the space in which I bring my inspirations to life. Most days,
                you&apos;ll find me at my &apos;wall of creation&apos; in the
                front room smearing paint on canvas and living my dream.
                <br />
                <br />
                Currently, I am deeply immersed in developing my newest body of
                work while cherishing precious moments with my family and our
                new additions. As such, I am not posting regular hours on the
                weekends. However, most weeks I can be found in the studio
                Monday through Saturday from 10am to 5pm. I welcome all visitors
                whether it is to simply take a look at art, watch me paint, or
                sit down for a conversation. I am always happy to share my story
                and my art to anyone who is interested. If you happen by and the
                shades are up to keep the sun out, don&apos;t hesitate to knock.
                I am only a few brush strokes away.
                <br />
                <br />
                For a more personalized experience, I welcome studio
                appointments. Simply reach out using the contact form below or
                via my contact information, and I&apos;ll be there in no time.
                Living just down the street, I&apos;m usually a few minutes
                away.
                <br />
                <br />I look forward to meeting you and sharing my artistic
                journey!
              </p>
            </motion.div>
          </div>
          <div id="location" className="flex flex-col gap-20 md:flex-row">
            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              initial="hidden"
              animate="show"
              className=" md:w-1/2"
            >
              <GoogleMap center={studioLocation} zoom={15} />
            </motion.div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ContactPage;
