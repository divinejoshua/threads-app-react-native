import * as React from "react";
import { Thread } from "../types/threads";
import { generateThreads } from "../utils/generate-dommy-data";


// Define the type for the context value
interface ThreadContextValue {
  threads: Thread[];
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
}

// Use the defined type for createContext
export const ThreadContext = React.createContext<ThreadContextValue>({
  threads: [],
  setThreads: () => {},
});



// export const ThreadContext = React.createContext();

export const ThreadProvdier = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = React.useState<Thread[]>([]);

  React.useEffect(() => {
    setThreads(generateThreads());
  }, []);

  return (
    <ThreadContext.Provider value={{threads, setThreads}}>{children}</ThreadContext.Provider>
  );
};
