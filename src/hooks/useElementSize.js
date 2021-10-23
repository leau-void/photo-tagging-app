import React, { useEffect, useState } from "react";

const getSize = (elem, pixelRatio) => ({
  height: elem.offsetHeight * pixelRatio,
  width: elem.offsetWidth * pixelRatio,
});

const useElementSize = (ref) => {
  const [size, setSize] = useState();

  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio);

  const handleResize = (e) => {
    const newPixelRatio = window.devicePixelRatio;
    if (ref.current && pixelRatio === newPixelRatio) {
      setSize(getSize(ref.current, pixelRatio));
    } else {
      setPixelRatio(newPixelRatio);
    }
  };

  useEffect(() => {
    // initial size when ref is available
    if (!size) setSize(getSize(ref.current, pixelRatio));

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return size;
};

export default useElementSize;
