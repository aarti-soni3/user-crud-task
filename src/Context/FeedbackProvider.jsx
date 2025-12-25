import { SnackbarProvider, useSnackbar } from "notistack";
import { FeedbackContext } from "./CreateContext";

function FeedBackSnackbarProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const showFeedback = (message) => {
    enqueueSnackbar(message, { variant: "default" });
  };

  const showSuccessFeedback = (message) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const showErrorFeedback = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  return (
    <>
      <FeedbackContext.Provider
        value={{ showFeedback, showSuccessFeedback, showErrorFeedback }}
      >
        {children}
      </FeedbackContext.Provider>
    </>
  );
}

export default function FeedbackProvider({ children }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <FeedBackSnackbarProvider>{children}</FeedBackSnackbarProvider>
    </SnackbarProvider>
  );
}
