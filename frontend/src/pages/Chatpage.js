import {  ChatState } from "../Context/ChatProvider";
import {  Box , HStack} from '@chakra-ui/react';
import SideDrawer from "../Components/Layout/SideDrawer";
import ActiveChat from "../Components/Layout/ActiveChat";
import ChatsContainer from "../Components/Layout/ChatsContainer.js";
import { useState } from "react";




const Chatpage = ()=>{
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  return <div>
    {user && <SideDrawer/>}
    <HStack >
  <Box>
    {user&& <ChatsContainer fetchAgain={fetchAgain} />}
  </Box>
  <Box  >
    {user && <ActiveChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
  </Box>
 
</HStack>
    
   

    
  </div>
};


export default Chatpage;