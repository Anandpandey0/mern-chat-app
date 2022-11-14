import React from 'react'
import { useEffect , useState} from 'react';

import axios from "axios";



const Chatpage = () => {
  const [chats, setchats] = useState([]);
  const fetchChats = async ()=>{
    const {data} = await axios.get("/api/chat");
    // setchats(data);
    setchats(data);
    // console.log(data);
  }
  useEffect(() => {
    fetchChats();
  
    
  }, [])
  return (
    <>
    <div>{chats.map(chat=><div key={chat._id}>{chat.chatName}</div>)}</div>
    </>
  )
}

export default Chatpage