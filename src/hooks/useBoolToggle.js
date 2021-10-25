import { useState } from "react";

const useBoolToggle = (value) => {
  const [current, setCurrent] = useState(value);

  const toggleCurrent = (newVal) =>
    setCurrent(typeof newVal == "boolean" ? newVal : !current);

  return [current, toggleCurrent];
};

export default useBoolToggle;
