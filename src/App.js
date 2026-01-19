import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import "./styles/index.scss";
import Alert from "./components/Alert";
import { ENABLE_AUTH } from "./config/featureFlags";
import AnimatedRoutes from "./pages/AnimatedRoutes";

// Conditionally import auth only if enabled
let auth = null;
let useAuthStatus = null;

if (ENABLE_AUTH) {
  const configModule = require("./config/config-dev");
  const hooksModule = require("./hooks/hooks");
  auth = configModule.auth;
  useAuthStatus = hooksModule.useAuthStatus;
}

// Default auth state when Firebase is disabled
const defaultAuthState = {
  checkingStatus: false,
  authUser: { user: null, admin: false },
  updateAuthUserAttr: () => { }
};

function App() {
  // Use real auth if enabled, otherwise use default state
  const authState = ENABLE_AUTH && useAuthStatus ? useAuthStatus() : defaultAuthState;
  const { checkingStatus, authUser, updateAuthUserAttr } = authState;

  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const handleLogout = (alertMsg, alertType) => {
    if (!ENABLE_AUTH || !auth) {
      setAlertMsg("Authentication is disabled");
      return;
    }
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
