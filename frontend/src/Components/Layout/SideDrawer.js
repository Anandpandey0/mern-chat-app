import { React,useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  
  Center,
  Tooltip,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast ,
 
  Drawer,
  Spinner,

} from '@chakra-ui/react';
import { BellIcon,SearchIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoadingSearchResult from '../Spinner/LoadingSearchResult';
import UserListItem from '../List/UserListItem';




export default function SideDrawer() {

    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
      } = ChatState();
  const history = useHistory();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const logoutHandler =()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const searchHandler = async ()=>{
    if(!search){
        toast({
            title: 'Please fill the search field',
            status: 'error',
            isClosable: true,
            position:'bottom-left'
          })
    }
    try {
        setLoading(true);
  
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        console.log({data});
  
        setLoading(false);
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
  const accessChat = async (userId)=>{
    try {
        setLoadingChat(true);
        const config = {
          headers: {
            'Content-Type' : 'application/json', 
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(`/api/chat`, { userId }, config);
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
  
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
      } catch (error) {
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }

  }
  const handleSearch = async (query)=>{
    setSearch(query);
    if(!query){
        return;
    }
    try {
        setLoading(true);
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const {data } = await axios.get(`/api/user?search=${search}`, config);
          // console.log(data);
          setLoading(false);
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
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h='10vh' alignItems={'center'} justifyContent={'space-between'}>
            <Box><Tooltip hasArrow label='Search Friends' bg='gray.300' color='black'>
                    <SearchIcon  onClick={onOpen} />
            </Tooltip></Box>
          <Box>Social Connect</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <BellIcon boxSize={8}/>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    name={user.name}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://qph.cf2.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd'}
                      
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>My Profile</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        size='xs'
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search your Friends</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Search  Friends Name or Email'value={search} onChange={(e)=>handleSearch(e.target.value)} /><Button my='2' onClick={searchHandler}>Search</Button>
            {loading ? (
              <LoadingSearchResult/>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Flex ml='auto'><Spinner  /></Flex>}
            
          </DrawerBody>
          
          

         
        </DrawerContent>
      </Drawer>
    </>
  );
}