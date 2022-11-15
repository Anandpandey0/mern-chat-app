import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack,StackDivider } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { AiFillEye ,AiFillEyeInvisible} from 'react-icons/ai';
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    // setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers : {
            'Content-Type' : 'application/json', 
        },
    };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      // setLoading(false);
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
      // setLoading(false);
    }
  };

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
<Button onClick={submitHandler} width='100%' bg='blue.100' marginTop='1rem' colorScheme='blue.300' color='black' >Login</Button>

  </VStack>
  );
};

export default Login;
