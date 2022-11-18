import { Box, Image } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const SingleChat = ({fetchAgin , setFetchAgain}) => {
    const {user, selectedChat , setSelectedChat }= ChatState();

  return (
    <>
    {selectedChat ?(<p>Selected </p>):(
       <Image src='../../photo/noChatWallpaper.PNG'  />
    )}
    
    
    
    </>
  )
}

export default SingleChat