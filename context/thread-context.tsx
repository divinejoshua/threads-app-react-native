import { Dispatch, createContext, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { Thread } from "../types/threads";

// import { generateThreads } from "../utils/generate-dommy-data";


// Define the type for the context value
interface ThreadContextValue {
  threads: Thread[];
  setThreads: Dispatch<SetStateAction<Thread[]>>;
  updatedThreadId : string
  setUpdatedThreadId : Dispatch<SetStateAction<string>>
}

// Use the defined type for createContext
export const ThreadContext = createContext<ThreadContextValue>({
  threads: [],
  updatedThreadId : "",
  setThreads: () => {},
  setUpdatedThreadId: () => {},

});



// export const ThreadContext = React.createContext();

export const ThreadProvdier = ({
  children,
}: PropsWithChildren ): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [updatedThreadId, setUpdatedThreadId] = useState<string>("")

    useEffect(() => {

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
