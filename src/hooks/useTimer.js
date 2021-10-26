import { useState, useEffect } from "react";

const useTimer = (sleep) => {
  const [start, setStart] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!start) return;
    const interval = window.setInterval(() => {
      setTimer(Date.now() - start);
    }, sleep);

    return () => clearInterval(interval);
  }, [start]);

  return [timer, setStart];
};

export default useTimer;
