import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { Suspense } from "react";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./route.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
          {/* <App /> */}
        </Suspense>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
