import {
  Box,
  Button,
  Flex,
  Text,
  useToast,

} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import LoadingSearchResult from "../Spinner/LoadingSearchResult";

import { getSender } from "../Config/LogicOfDisplayingChat";
import GroupChatModel from "./GroupChatModel";

const ChatsContainer = ({fetchAgain}) => {
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <>
    <Box display={{ base: selectedChat ? "none" : "block", md: "block"}}  w={{ base: "100vw", md: "30vw" }} bg='white'
      >
      <Flex
      
        flexDirection="column"
        h="90vh"
       
      >
        <Flex flexDirection="row" justify="space-around">
          <Box >
            <Text fontSize="2xl" fontWeight="bold">
              My Chats
            </Text>
          </Box>
          <Box>
            <GroupChatModel>
            <Button border="solid 2px blue" >+ Create Group Chat</Button>
            
            </GroupChatModel>
           
          </Box>
        </Flex>

        {chats ? (
          <Flex
            gap="5"
            flexDirection="column"
            h="100%"
            my="3 "
            flexWrap="nowrap"
            overflow="scroll"
          >
            {chats.map((chat) => (
              <Box
                height={{ base: "10rem", md: "5rem" }}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                border='solid 2px black'
                borderRadius="lg"
                key={chat._id}
              >
                <Text>{!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}</Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Flex>
        ) : (
          <LoadingSearchResult />
        )}
      </Flex>
      </Box>
    </>
  );
};

export default ChatsContainer;
