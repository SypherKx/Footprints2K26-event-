import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./layouts/Layout";
import "./styles/index.scss";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import ThankYouOverlay from "./components/ThankYouOverlay";
import { FEST_OVER } from "./config/featureFlags";

function App() {
  return (
    <>
      {/* ── Thank-you farewell screen (shown when FEST_OVER = true) ── */}
      {FEST_OVER && <ThankYouOverlay />}

      {/* ── Original site: hidden when fest is over, NOT deleted ── */}
      <div style={FEST_OVER ? { display: "none" } : undefined}>
        <SmoothScroll>
          <ScrollToTop />
          <Layout>
            <AnimatedRoutes />
            <Analytics />
          </Layout>
        </SmoothScroll>
      </div>
    </>
  );
}

export default App;
