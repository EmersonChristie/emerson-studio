// components/InquiryForm.tsx
import React, { useEffect, useState } from "react";
import { Artwork } from "types/global";
import { useUser } from "@/lib/context/user-context";
import Divider from "../shared/divider";
import { X } from "lucide-react";
import useLoading from "@/lib/hooks/use-loading";
import { LoadingSpinner } from "@/components/shared/icons";
import { postInquiry } from "@/lib/strapi/inquiry";
import { useToast } from "@/lib/context/toast-context";

interface InquiryFormProps {
  setShowInquiryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  setShowInquiryModal,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [phoneError, setPhoneError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);

  const {
    selectedInquireArtworks,
    setSelectedInquireArtworks,
    toggleSelectInquireArtwork,
  } = useUser();
  const { isLoading, error, startLoading, stopLoading, setErrorMsg } =
    useLoading();

  const { showToast } = useToast();

  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // const validatePhone = (phone: string) => {
  //   // Regular expression for phone validation
  //   const re = /^(?:\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/;
  //   return re.test(phone);
  // };

  const getSelectedArtworkIds = () => {
    return selectedArtworks.map((artwork) => artwork.id);
  };

  const getInquiryCategory = () => {
    return selectedArtworks.length > 1 ? "Pricing" : "General Inquiry";
  };

  const initBody = () => {
    const contactData = {
      name,
      phone,
      email,
      preferences: {
        receivesNewsletter: newsLetter,
        receivesSalesEmails: true,
      },
    };
    const inquiryData = {
      message,
      source: "Website",
      artworks: getSelectedArtworkIds(),
      inquiryCategory: getInquiryCategory(),
    };
    const postBody = {
      contactData,
      inquiryData,
    };
    return postBody;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError(""); // Clear error message on valid email
    // if (phone && !validatePhone(phone)) {
    //   setPhoneError("Please enter a valid phone number");
    //   return;
    // }
    // setPhoneError(""); // Clear error message on valid phone

    startLoading();

    try {
      const postBody = initBody();
      console.log("Posting to inquiry endpoint with body: ", postBody);
      // send post request
      await postInquiry(postBody);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        // Handle non-Error objects
        setErrorMsg("An unknown error occurred");
      }
    } finally {
      stopLoading();
      setShowInquiryModal(false);
      showToast(
        <p className="flex items-center justify-center p-4">
          Your Inquiry has been Submitted
        </p>,
      );
      setSelectedInquireArtworks([]);
    }
  };

  useEffect(() => {
    if (selectedInquireArtworks.length !== 0) {
      setSelectedArtworks(selectedInquireArtworks);
    } else {
      setSelectedArtworks([]);
    }
  }, [selectedInquireArtworks]);

  return (
    <form onSubmit={handleSubmit} className=" mx-auto max-w-2xl">
      <div className=" flex flex-col pt-1 pb-2 text-left md:pb-4">
        <h1 className="text-xl font-400 uppercase tracking-wider text-gray-700 lg:text-2xl">
          Inquiry Form
        </h1>
        <Divider animated={true} className="py-2 md:py-3" />
      </div>
      {/* Artwork Grid  */}
      <div className="md:gapy-y-2 grid grid-cols-6 gap-y-1 rounded-lg object-cover pt-3 md:gap-y-3">
        {selectedArtworks.map((artwork) => (
          <div className="relative flex" key={artwork.id}>
            {/* X Circle Button */}
            <button
              onClick={() => toggleSelectInquireArtwork(artwork)}
              className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-600 p-1 text-white"
              style={{ height: "24px", width: "24px" }} // Adjust size as needed
            >
              <X />
            </button>

            {/* Artwork Image */}
            <img
              src={artwork.mainImage.data.attributes.url}
              alt={`Artwork ${artwork.id}`}
              className="mr-2 h-10 w-10 rounded-lg object-cover md:h-16 md:w-16" // Adjust size as needed
            />
          </div>
        ))}
      </div>

      {/* Contact Info ///////////////////////// */}
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm leading-6 text-gray-900"
          >
            Email <span className="text-red-500">*</span>
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
        <div className="flex sm:col-span-full">
          {/* <!-- Name Input Field --> */}
          <div className="flex-1">
            <label
              htmlFor="first-name"
              className="block text-sm leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Optional Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <!-- Phone Input Field --> */}
          <div className="ml-4 flex-1">
            <label
              htmlFor="phone-number"
              className="block text-sm leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="Optional Phone"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {/* {phoneError && (
                <p className="mt-1 text-sm text-red-500">{phoneError}</p>
              )} */}
            </div>
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
            name="newsletter"
            checked={newsLetter}
            onChange={() => setNewsLetter(!newsLetter)}
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
        className="my-4 w-full bg-gray-600 py-2 uppercase tracking-wide text-white md:my-6"
      >
        {isLoading ? <LoadingSpinner /> : "Submit Inquiry"}
      </button>
    </form>
  );
};
