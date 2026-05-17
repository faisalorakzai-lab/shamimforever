import { createRoot } from "react-dom/client";
  import { setBaseUrl } from "@workspace/api-client-react";
  import App from "./App";
  import "./index.css";

  const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
  if (apiBase) setBaseUrl(apiBase);

  createRoot(document.getElementById("root")!).render(<App />);
  