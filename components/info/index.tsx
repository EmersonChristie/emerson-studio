import React, { useEffect } from "react";
import Tabs from "@/components/shared/tabs";
import PageLayout from "@/components/shared/page-layout";
import ArtistPage from "./artist-page";
import ContactPage from "./contact-page";

interface InfoProps {
  currentTab: string;
}

const Info: React.FC<InfoProps> = ({ currentTab }) => {
  return (
    <PageLayout title="Emerson" subHeading="b. 1986 / Hawaii, USA">
      <Tabs />
      <div className="pt-6">
        {currentTab === "Artist" ? <ArtistPage /> : <ContactPage />}
      </div>
    </PageLayout>
  );
};

export default Info;
