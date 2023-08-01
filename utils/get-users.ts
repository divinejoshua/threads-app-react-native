import { useContext } from "react";
import { ThreadContext } from "../context/thread-context";

const useGetUsers = () => {

       // Data 
       const { users, setUsers } = useContext(ThreadContext);
   
       const getUsers = () : void =>{

        // Get the user data from the json file 
        let objectData = []
        objectData = require("../assets/data/users.json")
        let users = objectData.users

        
        // save the thread posts to store 
        setUsers(users)
    }
   
    return { getUsers };
}
 
export default useGetUsers;