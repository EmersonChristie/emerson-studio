import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FunctionComponent,
} from "react";
import { WithChildren } from "types/global";
// Define the type for the toast content

type ToastContent = {
  component: ReactNode | null; // ReactNode allows any valid React element
  isOpen: boolean; // Indicates if the toast is visible
};

// Define the type for the context
interface ToastContextType {
  showToast: (component: ReactNode) => void; // Function to show toast with a given component
}

// Create the Toast context with an empty initial value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook to use the Toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Component to provide the Toast context
export const ToastProvider: FunctionComponent<WithChildren> = ({
  children,
}) => {
  const [toastContent, setToastContent] = useState<ToastContent>({
    component: null,
    isOpen: false,
  });

  // Function to show a toast
  const showToast = (component: ReactNode) => {
    setToastContent({ component, isOpen: true });
    setTimeout(() => setToastContent({ component: null, isOpen: false }), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastContent.isOpen && (
        <Toast
          onClose={() => setToastContent({ component: null, isOpen: false })}
        >
          {toastContent.component}
        </Toast>
      )}
    </ToastContext.Provider>
  );
};

// Define the props for the Toast component
interface ToastProps {
  onClose: () => void; // Function to call when the toast is dismissed
  children: ReactNode; // Children elements to render inside the toast
}

// Toast Component
const Toast: FunctionComponent<ToastProps> = ({ onClose, children }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="slide-up-fade fixed bottom-0 left-1/2 mb-4 w-11/12 transform rounded-lg bg-white p-4 shadow-lg md:w-3/4">
      {children}
    </div>
  );
};
