import { useState, useEffect, Dispatch, SetStateAction } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage"; // Ensure this points to your useLocalStorage hook

const useModalWithDelay = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [showModal, setShowModal] = useState(false); // Normal React state
  const [hasModalBeenShown, setHasModalBeenShown] = useLocalStorage(
    "hasModalBeenShown",
    false,
  ); // Persisted state

  useEffect(() => {
    if (!hasModalBeenShown) {
      // Show the modal only if it hasn't been shown before
      const timer = setTimeout(() => {
        setShowModal(true);
        setHasModalBeenShown(true); // Update local storage to indicate the modal has been shown
      }, 10000); // Delay of 10 seconds
      return () => clearTimeout(timer);
    }
  }, [hasModalBeenShown, setHasModalBeenShown]);

  return [showModal, setShowModal];
};

export default useModalWithDelay;
