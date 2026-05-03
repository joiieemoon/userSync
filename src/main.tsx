import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { Suspense } from "react";
import { AppWrapper } from "./components/common/page-meta/index.tsx";
import { ThemeProvider } from "./context/theme-context/index.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./route.tsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth-context/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              style={{ marginTop: "60px", zIndex: 9999999 }}
            />
         
            <AppWrapper>
              <Suspense
                fallback={
                  <div className="w-full h-screen  flex justify-center items-center border">
                    Loading...
                  </div>
                }
              >
                <RouterProvider router={router} />
              
              </Suspense>
            </AppWrapper>
          </QueryClientProvider>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
