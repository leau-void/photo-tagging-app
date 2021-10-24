import { useEffect, useState } from "react";

const usePixelRatio = () => {
  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio);

  const resizeHandler = () => {
    setPixelRatio(window.devicePixelRatio);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return pixelRatio;
};

export default usePixelRatio;
