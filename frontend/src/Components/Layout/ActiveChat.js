import { Box} from '@chakra-ui/react';
import React from 'react'

import { ChatState } from '../../Context/ChatProvider'
import SingleChat from './SingleChat';

const ActiveChat = ({ fetchAgain, setFetchAgain }) => {
    const {selectedChat} = ChatState();
  return (
    <>
     <Box width={{md:"65vw"}} h='90vh' border='solid 2px black'
     display={{ base: selectedChat ? "block" : "none", md: "block"}} 
     w={{ base: selectedChat ? "96.5vw" : "0vw", md: "65vw"}}
       >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        
        
    </Box>
    </>
  )
}

export default ActiveChat