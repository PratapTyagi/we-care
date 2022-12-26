import { createContext, useState } from "react";
import { Message } from "../containers";

const ToasterContext = createContext({});
function ToasterContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(4000);
  const [content, setContent] = useState({
    type: "",
    message: "",
  });

  const showToast = ({ type = "success", message, duration }) => {
    setContent({ type, message });
    setOpen(true);
    if (duration) setDuration(duration);
  };

  const value = {
    showToast,
  };

  return (
    <ToasterContext.Provider value={value}>
      {children}
      <Message
        open={open}
        content={content}
        duration={duration}
        onClose={() => setOpen(false)}
      />
    </ToasterContext.Provider>
  );
}

export { ToasterContext, ToasterContextProvider };
