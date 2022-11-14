import React from 'react'
import { useState } from 'react';
import { AiFillEye ,AiFillEyeInvisible} from 'react-icons/ai';


import {
    FormControl,
    FormLabel,
   
  
    VStack,
    StackDivider,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    
  } from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show);

  return (
    <VStack
    divider={<StackDivider borderColor='gray.200' />}
    spacing={4}
    align='stretch'
  >
    <FormControl id="email" isRequired>
  <FormLabel>Email address</FormLabel>
  <Input type='email'onChange={(e)=>setEmail(e.target.value)}/>

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
<Button onClick={""} width='100%' bg='blue.100' marginTop='1rem' colorScheme='blue.300' color='black' >Login</Button>

  </VStack>
  )
}

export default Login