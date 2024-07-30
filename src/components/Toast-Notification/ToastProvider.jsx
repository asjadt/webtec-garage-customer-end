import React, { createContext, useState } from 'react';
import { X } from 'lucide-react';

// Create the context with a default value of null
export const ToastContext = createContext(null);

// The ToastProvider component that will wrap the application or parts of it
const ToastProvider = ({ children }) => {
    // State to hold the list of toasts
    const [toasts, setToasts] = useState([]);

    // Function to open a new toast
    const open = (component, timeout = 50000) => {
        // Generate a unique ID for the toast
        const id = Date.now();

        // Add the new toast to the state
        setToasts([{ id, component }, ...toasts]);

        // Set a timeout to automatically close the toast after the specified duration
        setTimeout(() => close(id), timeout);
    };

    // Function to close a toast by its ID
    const close = (id) => {
        // Filter out the toast with the specified ID from the state
        setToasts((toasts) => toasts.filter((toast) => toast?.id !== id));
    };

    return (
        // Provide the open and close functions to the context
        <ToastContext.Provider value={{ open, close }}>
            {children}
            {/* Render the toasts */}
            <div className="space-y-2 absolute top-1/2 left-[40%] z-[9999] max-w-md rounded-md">
                {toasts.map(({ id, component }) => (
                    <div key={id} className="relative rounded-md w-[400px] shadow shadow-primary-content border border-primary-content bg-base-300">
                        <h4 className="font-bold bg-primary-content text-3xl w-full block pl-4">Warning !</h4>
                        <button
                            type="button"
                            onClick={() => close(id)}
                            className="absolute top-1 right-2 rounded-full bg-gray-200/20 text-gray-800/60 p-1"
                        >
                            <X size={24} />
                        </button>
                        {component}

                        <div className="flex gap-3 items-center justify-end my-2 mr-2">
                            <button
                                onClick={() => close(id)}
                                className="btn btn-sm btn-primary  rounded-md" type="button">Okay
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
