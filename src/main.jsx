import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./Store/store.js";
import { Provider } from "react-redux";
import FeedbackProvider from "./Context/FeedbackProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <FeedbackProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </FeedbackProvider>
    </>
  </StrictMode>
);
