import { createContext, useState, useContext } from "react";
import MySnackbar from "../components/MySnackbar";

// Explination

// <SnackbarContext>     ---> Parent
// <TodoList></TodoList> ---> Children
// </SnackbarContext>

// In our Case children is the div in "App.js" Wraps
// apply refactor by turning the context into Provider
// so all the logic related to the SnackbarContext (states,function) are now spreated from the "App.js" because it doesn't belong to it
 const SnackbarContext = createContext({});
export const SnackbarPovider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Snackbar appears the disapears , after some time specified using setTimeout
  function showHideSnackbar(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <SnackbarContext.Provider value={{ showHideSnackbar }}>
      <MySnackbar open={open} message={message} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
