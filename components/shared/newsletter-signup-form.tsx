import React, { useState } from "react";
import { useToast } from "@/lib/context/toast-context";
import { LoadingSpinner } from "@/components/shared/icons";
import { postNewsletterSignup } from "@/lib/strapi/contacts";
import Divider from "./divider";

interface NewsletterSignupFormProps {
  onSuccess?: () => void; // Optional callback function
}

export const NewsletterSignupForm: React.FC<NewsletterSignupFormProps> = ({
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");

    setIsLoading(true);

    try {
      // Add your API call logic here
      console.log("Submitting email:", email);
      await postNewsletterSignup(email);

      // Clear the form
      setEmail("");

      onSuccess?.(); // Call the callback function if it exists

      showToast(
        <p className="flex items-center justify-center p-4">
          Thank you for signing up!
        </p>,
      );
    } catch (error) {
      setEmailError(
        "An error occurred while submitting your email. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-1920">
      <div className="flex flex-col pb-2 text-left md:pb-4">
        <p className="lg:text-md  text-sm text-gray-600">
          Members of my mailing list are the first to know about new available
          artworks, upcoming exhibitions, and other news.
        </p>
      </div>
      <div id="iputs" className="flex flex-col gap-4 md:w-1/2">
        <div className="mt-4 ">
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
              className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="my-4 w-full  bg-gray-600 py-2 uppercase tracking-wide text-white md:my-6"
        >
          {isLoading ? <LoadingSpinner /> : "Sign Up"}
        </button>
      </div>
      <Divider animated={true} className="py-2" />
      <p className="pt-3 text-xs text-gray-400 ">
        You can unsubscribe at any time with Unsubscribe link in emails. Your
        information will never be shared with a third party.
      </p>
    </form>
  );
};
