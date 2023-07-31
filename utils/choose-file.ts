import { useContext, useState } from "react";
import { ThreadContext } from "../context/thread-context";

const useChooseFile = () => {

    // Data 
    const [dataList, setdataList] = useState<string[]>(["one", "two", "three", "four", "five"])

    const { threads, setThreads } = useContext(ThreadContext);


    const getPosts = () : void =>{
        // Pick a file index at random
        let file = Math.floor(Math.random() * dataList.length);
        let threadPage = null

        // Select a json file at random  and set the threadData from the file to state 
        if (dataList[file]=="one"){
            threadPage = require("../assets/data/one.json")
          }
          if (dataList[file]=="two"){
            threadPage = require("../assets/data/two.json")
          }
          if (dataList[file]=="three"){
            threadPage = require("../assets/data/three.json")
          }
          if (dataList[file]=="four"){
            threadPage = require("../assets/data/four.json")
          }
          if (dataList[file]=="five"){
            threadPage = require("../assets/data/five.json")
          }

        // save the thread posts to store 
        setThreads(threadPage)

    }
   

    return { getPosts };
}
 
export default useChooseFile;