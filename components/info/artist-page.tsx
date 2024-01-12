import framer from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import ImageSlider from "@/components/shared/image-slider";
import { artistImages } from "@/lib/artistImageData";

const ArtistPage = () => {
  return (
    <div className="container">
      <div id="main-content" className="flex flex-col gap-20 md:flex-row">
        <div className="md:w-1/2">
          <ImageSlider images={artistImages} interval={3000} />
        </div>
        <div className="md:w-1/2">
          <p className="text-md text-gray-600">
            Art has always been a refuge for me, a constant source of peace
            amidst life’s fluctuations. When I am painting, expressing, I feel
            at home. In expression I feel a fullfillment of purpose. Not merely
            in the act of painting, but in finding that which makes my heart
            sing, a way of being that trascends relentless rumination, and
            creates flow, a space to dance…outside of time. When I am able to
            embody this state the greatest depth of beauty is realized. This
            state of being, I feel, is something everyone can find in their own
            way. Seeking it daily is my way of being grateful for the gift of
            being and inviting a world in which All are able to find the same.
            <br />
            For me, art is a playground in which we can and should explore. The
            through-line in my work is a commitment to paint what excites me in
            the moment. My creations are curated by curiosity, and because of
            this I have not focused on honing a particular style, opting instead
            to embrace naturalness. For some artists, it is natural and
            intriguing to delve deep into a particular style or subject matter,
            and this may very well become the case for me at some point. What I
            Know within is that if and when it does come, it will feel right, it
            won’t be a choice. It will feel like Being rather than doing. This
            is the way that I seek in my art and in my life.
            <br />
            There will be contrivances on the path to naturalness, but the
            contrivances are part of the path and, therefore, innately natural.
            <br />
            In my artistic expression, there are days I focus on painterly
            skills, capturing the beauty around us. Other times, I surrender to
            spontanaeity, manipulating paint in a frenzied yet purposeful dance,
            trusting that following what excites me will result in something
            beautiful. Sometimes the beauty is aesthetic, other times it is a
            deeper personal insight resulting from the process, but it is always
            imbued with a sense of peace.
            <br />
            Some of my paintings are simply a result of the process that I love,
            while others echo profound subjective truths with a depth of meaning
            that is continually revealed. The more I paint, the more intuitive
            my process becomes, allowing me to more frequently achieve a state
            of 'no mind' while maintaining coherence in the work. Some paintings
            start without explicit meaning, evolving naturally until they reveal
            their essence. Often, when I complete such a piece, I step back to
            view it as an observer, curious about the secrets the work will
            reflect and evoke…what gems will be shared by the muse when I listen
            to her call. My hope for the viewer is to find their own truths in
            my work, to experience the beauty of the present moment, and to be
            inspired to find their flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
