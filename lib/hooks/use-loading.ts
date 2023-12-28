import { useState } from "react";

/**
 * Custom hook to manage loading and error states.
 *
 * @returns An object with loading state, error state, and functions to manipulate these states.
 */
function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sets loading state to true.
   */
  const startLoading = () => setIsLoading(true);

  /**
   * Sets loading state to false.
   */
  const stopLoading = () => setIsLoading(false);

  /**
   * Sets the error message.
   *
   * @param msg The error message.
   */
  const setErrorMsg = (msg: string) => setError(msg);

  /**
   * Clears the error state.
   */
  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setErrorMsg,
    clearError,
  };
}

export default useLoading;
