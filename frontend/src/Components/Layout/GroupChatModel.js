import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalFooter, Button, Text, Input, FormLabel, FormControl, Spinner, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../List/UserListItem'
import UserAvatarBadge from '../List/UserAvatarBadge'

const GroupChatModel = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search,setSearch] = useState();
    const [searchResult, setSearchResult] = useState()
    const [loading, setloading] = useState(false)
    const toast = useToast()
    const {user,chats,setChats} = ChatState();
    const handleSearch = async (query)=>{
        setSearch(query);
        if(!query){
            return;
        }
        try {
            setloading(true);
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
              const {data } = await axios.get(`/api/user?search=${search}`, config);
              console.log(data);
              setloading(false);
              setSearchResult(data);
            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    }
    const handleSubmit = async ()=>{
        if(!groupChatName || !selectedUsers){
          toast({
            title: "Please fill all fields",
            description: "Failed to create a group chat",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
        try {
          setloading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const {data} = await axios.post('/api/chat/group',{
            name:groupChatName,
            users:JSON.stringify(selectedUsers.map((u)=>u.id)),

          },config);
          setChats([data,...chats]);
          onClose();
          toast({
            title: "Group chat Created",
            description: "Successfully created a group",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });

          
        } catch (error) {
          toast({
            title: "Failed ",
            description: "Failed to create a group chat",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          
        }
    }
    const handleDelete = (delUser) => {
      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
    const handleGroupMember =(userToBeAdded)=>{
        if(selectedUsers.includes(userToBeAdded)){
            toast({
                title: "User already added",
                description: "The user you are trying to add is already in the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
              return;

        }
        setSelectedUsers([...selectedUsers,userToBeAdded])

    }
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}  >
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Chat name</FormLabel>
              <Input  placeholder='Chat name' value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Add Members </FormLabel>
              <Input onChange={(e)=>handleSearch(e.target.value)} />
            </FormControl>
            <Flex flexDirection='column' >
            {selectedUsers.map((user)=>(
                <UserAvatarBadge key={user._id} user={user} handleFunction={()=>handleDelete(user)}/>
            ))}
            </Flex>
            {loading?<Spinner color='blue.400' />:(searchResult?.slice(0,2).map((user)=>(
                <UserListItem key={user._id} user={user} handleFunction={()=>handleGroupMember(user)}/>
            )))}
          </ModalBody>
          {/* selected USers */}
          
            {/* Rendered Users */}
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create 
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}

export default GroupChatModel