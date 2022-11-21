import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number | undefined,
  height: number | undefined,
}

// Provides width/height of current browser window
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;