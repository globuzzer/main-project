import React, { useState } from "react";
import Menu from "../Menu/Menu";

export const multiStepContext = React.createContext();
const StepContext = () => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [userData, setuserData] = useState([]);
  const [finalData, setfinalData] = useState([]);
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStepNumber,
          setCurrentStepNumber,
          userData,
          setuserData,
          finalData,
          setfinalData,
        }}
      >
        <Menu />
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
