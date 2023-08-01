import { useContext } from "react";
import { ThreadContext } from "../context/thread-context";

const useGetUsers = () => {

       // Data 
       const { users, setUsers } = useContext(ThreadContext);
   
       const getUsers = () : void =>{

        let objectData = []
        objectData = require("../assets/data/users.json")
        let users = objectData.users

        
        // save the thread posts to store 
        setUsers(users)

        console.log("gothere")

    }
   
    return { getUsers };
}
 
export default useGetUsers;