import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Define the props for the Toast component
interface ToastProps {
  message: string; // The message to display in the toast
  duration?: number; // Duration before the toast auto-dismisses (default is 3000ms)
  onClose: () => void; // Callback function to run when the toast is dismissed
}

/**
 * Toast Component
 *
 * This component displays a toast notification on the screen.
 * It uses framer-motion for animations and automatically dismisses
 * after a specified duration.
 *
 * Props:
 * - message: The message to be displayed in the toast.
 * - duration (optional): How long the toast stays visible before auto-dismissing.
 * - onClose: Function to call when the toast is dismissed.
 */
const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    // Set a timer to auto-dismiss the toast after the specified duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Cleanup function to clear the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      // Add your custom styling here for the toast
      // Example: className="toast"
    >
      {message}
    </motion.div>
  );
};

export default Toast;
