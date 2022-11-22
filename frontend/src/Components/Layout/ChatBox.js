import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import InfiniteScroll from 'react-infinite-scroller';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/LogicOfDisplayingChat";
import { ChatState } from "../../Context/ChatProvider";
import { Flex } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
 
  const { user } = ChatState();

  const loadmoreHandler=(e)=>{

  }

  return (
    <InfiniteScroll loadMore={loadmoreHandler}   >
      {messages &&
        messages.map((m, i) => (
          <div  key={m._id}  >
            <Flex alignItems='center' >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </Flex>
          </div>
          
        ))}
    </InfiniteScroll>
  );
};

export default ScrollableChat;