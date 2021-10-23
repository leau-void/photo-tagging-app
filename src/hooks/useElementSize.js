import React, { useEffect, useState } from "react";

const getSize = (elem, pixelRatio) => ({
  height: elem.getBoundingClientRect().height * pixelRatio,
  width: elem.getBoundingClientRect().width * pixelRatio,
});

const useElementSize = (ref) => {
  const [size, setSize] = useState({});

  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio);

  useEffect(() => {
    setSize(getSize(ref.current, pixelRatio));
  }, []);

  useEffect(() => {
    const handleResize = (e) => {
      const newPixelRatio = window.devicePixelRatio;
      if (ref.current && pixelRatio === newPixelRatio) {
        setSize(getSize(ref.current, pixelRatio));
      } else {
        setPixelRatio(newPixelRatio);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return size;
};

export default useElementSize;
