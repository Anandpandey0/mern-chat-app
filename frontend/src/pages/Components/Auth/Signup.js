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
    Button,
    InputGroup,
    InputRightElement,
    
  } from '@chakra-ui/react'

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [pic, setPic] = useState();
    const postDetails=(pics)=>{
 
    };
 
 
   
 
 
   const [show, setShow] = React.useState(false)
   const handleClick = () => setShow(!show);
   const submitHandler= ()=>{

   }
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
        <FormLabel>Confrim Password</FormLabel>
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
      <FormControl id="pic" isRequired>
  <FormLabel>Upload Your Picture</FormLabel>
  <Input type='file' accept='image/*'  onChange={(e) => postDetails(e.target.files[0])}/>
 
</FormControl>
<Button onClick={submitHandler} width='100%' bg='blue.100' marginTop='1rem' colorScheme='blue.300' color='black' >Sign up</Button>



  
  
</VStack>
  )
}

export default Signup