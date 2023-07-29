import * as React from "react";
import { Thread } from "../types/threads";

// import { generateThreads } from "../utils/generate-dommy-data";


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

    // Pick at random 
    let dataList = ["one", "two", "three", "four", "five"]
    let file = Math.floor(Math.random() * dataList.length);
    let threadData : any =null
    

    // Select a json file at random 
    if (dataList[file]=="one"){
      threadData = require("../assets/data/one.json")
    }
    if (dataList[file]=="two"){
      threadData = require("../assets/data/two.json")
    }
    if (dataList[file]=="three"){
      threadData = require("../assets/data/three.json")
    }
    if (dataList[file]=="four"){
      threadData = require("../assets/data/four.json")
    }
    if (dataList[file]=="five"){
      threadData = require("../assets/data/five.json")
    }

    setThreads(threadData);
  }, []);

  return (
    <ThreadContext.Provider value={{threads, setThreads, updatedThreadId, setUpdatedThreadId}}>{children}</ThreadContext.Provider>
  );
};
