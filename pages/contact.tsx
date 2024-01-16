import React, { useState, useEffect } from "react";
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
  lat: 36.479348113057355,
  lng: -121.73118898985982,
};

const ContactPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const GOOGLE_MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

  useEffect(() => {
    const googleMapsScript = document.querySelector(
      `script[src="${GOOGLE_MAPS_API}"]`,
    );
    setScriptLoaded(!!googleMapsScript);

    if (!googleMapsScript) {
      const script = document.createElement("script");
      script.src = GOOGLE_MAPS_API;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
        strategy="beforeInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <PageLayout title="Contact">
        <div id="main-content" className="flex flex-col gap-20">
          <div
            id="introduction"
            className="flex flex-col items-center justify-center gap-20 md:flex-row"
          >
            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              initial="hidden"
              animate="show"
              className="md:w-1/2"
            >
              <ImageSlider images={contactImages} interval={3000} />
            </motion.div>
            <motion.div className="md:w-1/2" {...FADE_IN_ANIMATION_SETTINGS}>
              <p className="lg:text-md  text-sm text-gray-600 2xl:text-lg ">
                Nestled in the heart of Carmel Valley Village, Emerson Studio is
                the space in which I bring my inspirations to life. Most days,
                you&apos;ll find me at my &apos;wall of creation&apos; in the
                front room smearing paint on canvas and possibly dancing.
                <br />
                <br />
                Currently, I am deeply immersed in developing my newest body of
                work while cherishing precious moments with our new little ones
                Holden and Sienna. As such, I am not posting regular hours on
                the weekends. However, most weeks I can be found in the studio
                Monday through Friday from 11am to 5pm with Saturdays being
                reserved for Open Studio visits. I welcome all visitors whether
                it is to simply take a look at art, watch me paint, or sit down
                for a conversation. If you happen by and the shades are up to
                keep the glare out, don&apos;t hesitate to knock. I am only a
                few brush strokes away.
                <br />
                <br />
                For a more personalized experience, I welcome studio
                appointments. Simply reach out using the chat in the bottom
                right of the screen or text message for an immediate response,
                and I&apos;ll be there in no time. Living just down the street,
                I&apos;m usually a few minutes away.
                <br />
                <br />I look forward to meeting you and sharing my artistic
                journey!
              </p>
            </motion.div>
          </div>
          <div
            id="location"
            className="flex flex-col items-center justify-center gap-20 pt-10 md:flex-row"
          >
            <motion.div className="md:w-1/2" {...FADE_IN_ANIMATION_SETTINGS}>
              <p className="lg:text-md text-center text-sm text-gray-600 2xl:text-lg ">
                <span className="text-md font-bold text-gray-600 lg:text-lg 2xl:text-xl">
                  Email
                </span>
                <br />
                <a
                  href="mailto:info@emersoncontemporary.art"
                  className="text-gray-600 hover:text-gray-800"
                >
                  info@emersoncontemporary.art
                </a>
                <br />
                <br />
                <span className="text-md font-bold text-gray-600 lg:text-lg 2xl:text-xl">
                  Location
                </span>
                <br />
                Emerson Studio
                <br />
                13 W Carmel Valley Rd, Ste. B
                <br />
                Carmel Valley, CA 93924
                <br />
                <br />
                <span className="text-md font-bold text-gray-600 lg:text-lg 2xl:text-xl">
                  Phone
                </span>
                <br />
                <a
                  href="tel:831-747-0994"
                  className="text-gray-600 hover:text-gray-800"
                >
                  (831) 747-0994
                </a>
                <br />
                <br />
                <span className="text-md font-bold text-gray-600 lg:text-lg 2xl:text-xl">
                  Hours
                </span>
                <br />
                Monday - Saturday: 11am - 5pm
                <br />
              </p>
            </motion.div>

            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              initial="hidden"
              animate="show"
              className=" md:w-1/2"
            >
              <GoogleMap
                center={studioLocation}
                zoom={15}
                isScriptLoaded={scriptLoaded}
              />
            </motion.div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ContactPage;
