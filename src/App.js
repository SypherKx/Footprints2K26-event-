import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import "./styles/index.scss";
import Alert from "./components/Alert";
import { ENABLE_AUTH } from "./config/featureFlags";
import AnimatedRoutes from "./pages/AnimatedRoutes";

// Default auth state when Firebase is disabled
const defaultAuthState = {
  checkingStatus: false,
  authUser: { user: null, admin: false },
  updateAuthUserAttr: () => { }
};

// Custom hook that handles auth conditionally
function useAppAuth() {
  // When auth is disabled, just return defaults
  if (!ENABLE_AUTH) {
    return defaultAuthState;
  }

  // When auth is enabled, dynamically load and use the real hook
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { useAuthStatus } = require("./hooks/hooks");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAuthStatus();
}

function App() {
  const { checkingStatus, authUser, updateAuthUserAttr } = useAppAuth();

  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const handleLogout = (alertMsg, alertType) => {
    if (!ENABLE_AUTH) {
      setAlertMsg("Authentication is disabled");
      return;
    }
    const { auth } = require("./config/config-dev");
    auth.signOut()
      .then(() => {
        if (alertMsg) {
          setAlertMsg(alertMsg, alertType);
        } else {
          setAlertMsg("Signed out!");
        }
      })
      .catch((err) => {
        setAlertMsg(err.message);
        setAlertSeverity("error");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setAlertMsg("");
      setAlertSeverity("info");
    }, 5000);
  }, [alertMsg]);

  return (
    <Layout user={authUser}>
      <Alert message={alertMsg} severity={alertSeverity} />
      <AnimatedRoutes
        authUser={authUser}
        handleLogout={handleLogout}
        updateAuthUserAttr={updateAuthUserAttr}
        checkingStatus={checkingStatus}
      />
    </Layout>
  );
}

export default App;
