import { useState } from "react";
//this is also connected to  GetStartedModal
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle,
  };
};

export default useModal;
