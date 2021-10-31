import { useCallback, useEffect, useState } from "react";
import { usePixelRatio } from ".";

const getSize = (elem, pixelRatio) => ({
  height: elem.offsetHeight * pixelRatio,
  width: elem.offsetWidth * pixelRatio,
});

const useElementSize = (ref) => {
  const [size, setSize] = useState();
  const pixelRatio = usePixelRatio();

  const handleResize = useCallback(() => {
    const newPixelRatio = window.devicePixelRatio;
    if (ref.current && pixelRatio === newPixelRatio) {
      setSize(getSize(ref.current, pixelRatio));
    }
  }, [pixelRatio, ref]);

  useEffect(() => {}, [ref]);

  useEffect(() => {
    // initial size when ref is available
    window.setTimeout(() => setSize(getSize(ref.current, pixelRatio)), 200);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, pixelRatio, handleResize]);

  return size;
};

export default useElementSize;
