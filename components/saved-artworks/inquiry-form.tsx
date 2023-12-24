// components/InquiryForm.tsx
import React, { useEffect, useState } from "react";
import { Artwork } from "../../types/global";
import { useUser } from "@/lib/context/user-context";
import Divider from "../shared/divider";

interface InquiryFormProps {
  postInquiry: (data: any) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ postInquiry }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const { selectedInquireArtworks, setSelectedInquireArtworks } = useUser();

  //TODO: Add postInquiry function from context

  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError(""); // Clear error message on valid email
    const inquiryData = {
      firstName,
      email,
      message,
      selectedArtworks,
      newsLetter,
    };
    console.log(inquiryData);
    // postInquiry(inquiryData);
  };

  useEffect(() => {
    if (selectedInquireArtworks.length !== 0) {
      setSelectedArtworks(selectedInquireArtworks);
    } else {
      setSelectedArtworks([]);
    }
  }, [selectedInquireArtworks]);

  return (
    <form onSubmit={handleSubmit} className=" mx-auto max-w-lg">
      <div className=" flex flex-col pt-1 pb-2 text-left md:pb-4">
        <h1 className="text-xl font-400 uppercase tracking-wider text-gray-700">
          Inquiry Form
        </h1>
        <Divider animated={true} className="py-2 md:py-3" />
      </div>
      {/* Artwork Grid  */}
      {/* TODO: implement buttons to remove artworks */}
      <div className="grid grid-cols-10 gap-1 pt-3">
        {selectedArtworks.map((artwork) => (
          <div className=" flex overflow-hidden " key={artwork.id}>
            <img
              src={artwork.mainImage.data.attributes.url}
              alt={`Artwork ${artwork.id}`}
              className=" h-12 w-12 rounded-lg object-cover" // Adjust size as needed
            />
          </div>
        ))}
      </div>
      {/* Contact Info ///////////////////////// */}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm leading-6 text-gray-900"
          >
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm  leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              placeholder="Optional Name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Message ////////////////// */}
        <div className="col-span-full">
          <label
            htmlFor="message"
            className="block text-sm leading-6 text-gray-900"
          >
            Message
          </label>
          <div className="mt-2">
            <textarea
              id="message"
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional message"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>
      </div>

      {/* Signup for Newsletter */}
      <div className="relative mt-6 flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="newsletter"
            name="mewsletter"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="newsletter" className="font-medium text-gray-900">
            SignUp for Newsletter
          </label>
          <p className="text-gray-500">
            Be the first to hear about new works and exhibitions.
          </p>
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="my-4 w-full rounded bg-gray-700 py-2 uppercase tracking-wide text-white md:my-6"
      >
        Submit Inquiry
      </button>
    </form>
  );
};
