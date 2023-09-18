import React, { useState, useEffect } from "react";
import Dashboard from "../Components/HomePage/Dashboard";
import { useLocation } from "react-router-dom";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
const Home = () => {
  const location = useLocation();
  const showToastMessage = location?.state?.showToastMessage;
  const [showToast, setShowToast] = useState(false);

  const showErrorToastMessage = location?.state?.showErrorToastMessage;
  const showErrorToast = location?.state?.showErrorToast;
  useEffect(() => {
    if (showToastMessage) {
      setShowToast(true);

      const timeoutId = setTimeout(() => {
        setShowToast(false);
      }, 4000);

      // Clean up the timeout when the component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showToastMessage]);

  return (
    <>
      <Dashboard />
      {showToast && (
        <SuccessToaster
          showToast={showToast}
          setShowToast={setShowToast}
          showToastMessage={`Hey ${showToastMessage}! Welcome to Vibezter Admin`}
          customMessage={`Welcome to Vibezter Admin`}
        />
      )}
      {showErrorToast && (
        <ErrorToaster
          showErrorToast={showErrorToast}
          setShowErrorToast={showErrorToast}
          showErrorToastMessage={showErrorToastMessage}
          customErrorMessage={"Something went Wrong Please verify and retry."}
        />
      )}
    </>
  );
};

export default Home;
