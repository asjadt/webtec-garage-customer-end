import { useState, useEffect } from "react";

// Custom Hook to get window width
function useWindowWidth() {
  // Initialize state with the current window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to update state when window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width: windowWidth };
}

export default useWindowWidth;
