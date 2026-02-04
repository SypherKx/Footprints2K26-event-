import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./layouts/Layout";
import "./styles/index.scss";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <Layout>
        <AnimatedRoutes />
        <Analytics />
      </Layout>
    </SmoothScroll>
  );
}

export default App;
