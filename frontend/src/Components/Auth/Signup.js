import React from 'react'
import { useState } from 'react';
import { AiFillEye ,AiFillEyeInvisible} from 'react-icons/ai';
import {
    FormControl,
    FormLabel,
    FormHelperText,
    VStack,
    StackDivider,
    Input,
    useToast ,
    Button,
    InputGroup,
    InputRightElement,
    
  } from '@chakra-ui/react'
  import axios from "axios";
  import { useHistory } from "react-router";
const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()
    // const [pic, setPic] = useState();
    const toast = useToast()
    const history = useHistory();

    // const postDetails=(pics)=>{
 
    // };
    // if(pic===setPic){
    //   console.log("");
    // }
 
 
   
 
 
   const [show, setShow] = React.useState(false)
   const handleClick = () => setShow(!show);
   const submitHandler = async () => {
    // setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status:"error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers : {
            'Content-Type' : 'application/json', 
        },
    };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
         
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      // setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setPicLoading(false);
    }
  };
  return (
    <VStack
    divider={<StackDivider borderColor='gray.200' />}
    spacing={4}
    align='stretch'
  >
  <FormControl id="name" isRequired>
    <FormLabel>Name</FormLabel>
    <Input type='text' onChange={(e)=>setName(e.target.value)}/>
    
  </FormControl>
  <FormControl id="email" isRequired>
    <FormLabel>Email address</FormLabel>
    <Input type='email'onChange={(e)=>setEmail(e.target.value)}/>
    <FormHelperText>We'll never share your email.</FormHelperText>
  </FormControl>
  <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <AiFillEyeInvisible/> : <AiFillEye/>}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  <FormControl id="password" isRequired>
          <FormLabel>Re-Enter Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Re-Enter Password"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <AiFillEyeInvisible/> : <AiFillEye/>}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      
  <Button onClick={submitHandler} width='100%' bg='blue.100' marginTop='1rem' colorScheme='blue.300' color='black' >Sign up</Button>
  
  
  
    
    
  </VStack>
  )
}

export default Signup