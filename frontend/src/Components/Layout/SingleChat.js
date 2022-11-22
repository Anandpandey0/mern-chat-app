import React, { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import ProfileDisplay from "../List/ProfileDisplay";
import UpdateGroupChatModal from "./UpdateGroupChatModel";
import "../../style.css";

import { ChatState } from "../../Context/ChatProvider";

import {
  getSender,
  getSenderFUllDetails,
} from "../Config/LogicOfDisplayingChat";
import axios from "axios";
import ChatBox from "./ChatBox";
import io from "socket.io-client";
const ENDPOINT = "https://social-connect-mern-app.herokuapp.com/";
var socket, selectedChatCompare;

// import UserAvatarBadge from "../List/UserAvatarBadge"
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat,notification, setNotification } = ChatState();
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);


  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      if (loading === setLoading) {
      }
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      console.log(selectedChat._id);

      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Can't fetch the message ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data.content);
        socket.emit("new-message", data);
        setnewMessage("");
        // socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Can't send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
        //Notify
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setnewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      <Box w='100%' h='100%'>
        {!selectedChat ? (
          <Image
            src="https://raw.githubusercontent.com/Anandpandey0/mern-chat-app/main/frontend/src/photo/noChatWallpaper.PNG"
            objectFit="cover"
            w="100%"
            maxH="100%"
          />
        ) : (
          <>
            <div w="100%">
              <Flex display={{ base: "flex", md: "none" }}>
                <IconButton
                  icon={<ArrowBackIcon />}
                  onClick={() => setSelectedChat("")}
                />
              </Flex>
              <Flex
                justifyContent={{ base: "space-between" }}
                alignItems="center"
              >
                {messages &&
                  (!selectedChat.isGroupChat ? (
                    <>
                      {getSender(user, selectedChat.users)}
                      <ProfileDisplay
                        user={getSenderFUllDetails(user, selectedChat.users)}
                      />
                    </>
                  ) : (
                    <>
                      {selectedChat.chatName.toUpperCase()}
                      <UpdateGroupChatModal
                        fetchMessages={fetchMessages}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                      />
                    </>
                  ))}
              </Flex>
            </div>
            <Box border="solid 2px yellow" h="70vh" overflowY="scroll">
              <ChatBox messages={messages} />
            </Box>
            <Box mt={2}>
              
              <FormControl onKeyDown={sendMessage} isRequired>
                {istyping?<div>Loading...</div>:<> </>}
                <Input
                  placeholder="Enter the message .."
                  onChange={typingHandler}
                  value={newMessage}
                  bg="grey.400"
                  color="black"
                />
              </FormControl>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SingleChat;
