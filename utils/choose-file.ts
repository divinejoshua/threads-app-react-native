import { useState } from "react";

const useChooseFile = () => {

    const [dataList, setdataList] = useState<string[]>(["one", "two", "three", "four", "five"])
    const [threadData, setthreadData] = useState<string>("")


    // Pick a file index at random
    let file = Math.floor(Math.random() * dataList.length);

     // Select a json file at random 
     if (dataList[file]=="one"){
        setthreadData("../assets/data/one.json")
      }
      if (dataList[file]=="two"){
        setthreadData("../assets/data/two.json")
      }
      if (dataList[file]=="three"){
        setthreadData("../assets/data/three.json")
      }
      if (dataList[file]=="four"){
        setthreadData("../assets/data/four.json")
      }
      if (dataList[file]=="five"){
        setthreadData("../assets/data/five.json")
      }
    return { threadData };
}
 
export default useChooseFile;