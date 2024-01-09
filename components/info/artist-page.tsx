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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            vitae eros at lectus eleifend aliquet. Donec fermentum, ligu laoreet
            imperdiet, magna odio dignissim magna, vitae ultrices justo ligula
            id libero. Sed quis lectus eget diam fermentum aliquam. Donec vel
            tristique eros. Sed sit amet dolor consectetur, ultricies nunc ut,
            aliquam nisl. Sed sit amet consectetur lectus. Donec euismod, dolor
            quis aliquam consectetur, nisl nisl aliquam elit, sit amet molestie
            lorem nisi ac quam. Fusce auctor, nisl vel euismod elementum, elit
            massa ultrices elit, vitae tincidunt justo nunc eget sem. Sed
            aliquam, elit non porta aliquam, sapien erat viverra diam, sed
            lacinia magna elit eget eros. Nulla facilisi. Nullam at magna
            aliquet, aliquet eros eget, semper tellus. Sed at turpis vel dui
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quos
            ducimus laborum est doloremque? Officiis explicabo deleniti
            perferendis iure nisi laboriosam assumenda, vel repellendus
            reiciendis cupiditate doloribus consectetur quam voluptatum?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
