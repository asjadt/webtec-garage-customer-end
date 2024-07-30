import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

// Custom hook to use the Toast context
export const useToast = () => {
    // Get the context value
    const context = useContext(ToastContext);
    // Ensure the hook is used within a ToastProvider
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
