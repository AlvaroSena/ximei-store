import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import { BrowserRouter } from "react-router-dom";
import { HeadProvider } from "react-head";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeadProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeadProvider>
  </StrictMode>
);
