import React, {useState} from "react";

const useToggle = (array, startIndex) => {
  const [current, setCurrent] = useState(array[startIndex])

  const toggleCurrent = () => setCurrent(array.find((item) => item !== current))

  return [current, toggleCurrent]
}

export default useToggle