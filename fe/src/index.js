import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
// Bootstrap SCSS
import "./styles/index.scss";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider } from "react-router-dom";


import router from "./router";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />

  </QueryClientProvider>
);