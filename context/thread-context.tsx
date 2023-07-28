import * as React from "react";
import { Thread } from "../types/threads";
import { generateThreads } from "../utils/generate-dommy-data";


// Define the type for the context value
interface ThreadContextValue {
  threads: Thread[];
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  updatedThreadId : string
  setUpdatedThreadId : React.Dispatch<React.SetStateAction<string>>
}

// Use the defined type for createContext
export const ThreadContext = React.createContext<ThreadContextValue>({
  threads: [],
  updatedThreadId : "",
  setThreads: () => {},
  setUpdatedThreadId: () => {},

});



// export const ThreadContext = React.createContext();

export const ThreadProvdier = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [updatedThreadId, setUpdatedThreadId] = React.useState<string>("")

  React.useEffect(() => {
    setThreads(generateThreads());
  }, []);

  return (
    <ThreadContext.Provider value={{threads, setThreads, updatedThreadId, setUpdatedThreadId}}>{children}</ThreadContext.Provider>
  );
};
