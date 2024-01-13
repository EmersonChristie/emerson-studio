import React from "react";
import ImageSlider from "@/components/shared/image-slider";
import { artistImages } from "@/lib/artistImageData";
import {
  FADE_IN_ANIMATION_SETTINGS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/lib/constants";
import { motion } from "framer-motion";
import PageLayout from "@/components/shared/page-layout";

const ArtistPage = () => {
  return (
    <div className="container">
      <PageLayout title="The Artist" subHeading="EMERSON • b. 1986 • USA">
        <div id="main-content" className="flex flex-col gap-20 md:flex-row">
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            initial="hidden"
            animate="show"
            className="md:w-1/2"
          >
            <ImageSlider images={artistImages} interval={3000} />
          </motion.div>
          <motion.div className="md:w-1/2" {...FADE_IN_ANIMATION_SETTINGS}>
            <p className="lg:text-md text-sm text-gray-600 2xl:text-lg">
              Art has always been a refuge for me, a constant source of
              tranquility amidst the ebb and flow of life. In the act of
              painting and expressing, I feel at home. I am filled with a
              profound sense of purpose that transcends mere creation. The
              creating was my catalyst to discovering a way of Being that
              escapes rumination and rests in that which feels right. It
              facilitates a state of flow—a timeless dance. I feel this state is
              attainable by everyone in their own way. Seeking it daily is my
              expression of gratitude for the gift of Being and an invitation
              for others to discover their own rhythm of flow.
              <br />
              <br />
              For me, art is a playground meant to be explored. The through-line
              in my work is a commitment to painting that which excites me at
              the moment. As a result, I haven&apos;t confined myself to a
              singular style, choosing instead to be lead by naturalness,
              trusting that it will manifest my truest form of expression. While
              some artists are naturally intrigued by delving deep into a
              particular style or subject, I am open to that evolution happening
              organically in my journey. What I Know within is that if it
              happens, it will feel natural, like Being rather than doing. This
              is the way I seek in my art and in my life.
              <br />
              <br />
              <span className="mt-3 text-lg font-bold text-gray-600">
                &lsquo;There will be contrivances on the path towards
                naturalness, but they are integral to the path itself, and thus
                inherently natural.&lsquo;
              </span>
              <br />
              <br />
              My artistic expression varies; some days are devoted to honing
              painterly skills and capturing the beauty around us. Other times,
              I surrender to spontaneity, manipulating paint in a frenzied yet
              purposeful dance, trusting that following my excitement will yield
              beauty. Whether it&apos;s aesthetic appeal or a deeper personal
              insight, each painting is imbued with gratitude for the creation
              and the experience it allows.
              <br />
              <br />
              Some of my paintings are simply a celebration of the process I
              love, while others convey profound subjective truths, with a depth
              of meaning that is yet to be fully realized. I cannot say which
              are the latter, for it depends on the viewer and their own
              subjective conversation with the work.
              <br />
              <br />
              The more I paint, the more intuitive my process becomes, allowing
              me to achieve a state of &lsquo;no mind&lsquo; while maintaining
              coherence. The work that begins without a predefined meaning,
              evolves naturally until its essence is revealed. Upon completion,
              I often step back as an observer, curious about the insights and
              emotions the piece will evoke—what gems will be shared by the muse
              when I listen to her call.
              <br />
              <br />
              My hope is that viewers will discover their own truths in my work,
              experience the beauty of the present moment, and feel inspired to
              find what evokes in them the passion and peace that painting does
              in me.
              <br />
              <br />~ Emerson
            </p>
          </motion.div>
        </div>
      </PageLayout>
    </div>
  );
};

export default ArtistPage;
