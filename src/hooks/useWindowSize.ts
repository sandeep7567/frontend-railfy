import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [mobileNavView, setMobileNavView] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let newMobileNavView = false;

      if (width >= 1536 || (768 <= width && width <= 1280)) {
        newMobileNavView = true;
      }

      setMobileNavView(newMobileNavView);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { mobileNavView, setMobileNavView };
};