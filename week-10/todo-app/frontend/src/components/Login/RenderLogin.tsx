import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

const RenderLogin: React.FC = () => {

  const navigate=useNavigate()
  const formBg = useColorModeValue("white", "gray.700");
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [name, setName]=useState('')

  const handleSignin = async () => {
    console.log('clicked', username, password)
    const res = await axios.post("http://localhost:8000/api/v1/user/signin", {
      username,
      password,
    });
    // localStorage.setItem("token", res.data.token);
    console.log(res)
    localStorage.setItem('userInfo',JSON.stringify(res.data))
    navigate("/todo");
  };
  const handleSignup = async () => {
    console.log('clicked', username, password)
    const res = await axios.post("http://localhost:8000/api/v1/user/signup", {
      username,
      password,
      name
    });
    // localStorage.setItem("token", res.data.token);
    console.log(res)
    localStorage.setItem('userInfo',JSON.stringify(res.data))
    navigate("/todo");
  };



  return (
    <Center w="100%" h="100%" bg="gray.50">
      <Box bg={formBg} p={8} borderRadius="md" boxShadow="md" w="sm">
        {isRegister ? (
          <>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} focusBorderColor="teal.400" />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} placeholder="Enter your password" focusBorderColor="teal.400" onChange={(e)=>setPassword(e.target.value)} />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter your name" value={name} focusBorderColor="teal.400" onChange={(e)=>setName(e.target.value)} />
              <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>

            <Button mt={6} colorScheme="teal" type="submit" w="full" onClick={()=>handleSignup()}>
              Register
            </Button>

            <Button mt={6} colorScheme="gray" type="button" w="full" onClick={() => setIsRegister(false)}>
              Back to Login
            </Button>
          </>
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} focusBorderColor="teal.400" />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} placeholder="Enter your password" focusBorderColor="teal.400" onChange={(e)=>setPassword(e.target.value)} />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>

            <Button mt={6} colorScheme="teal" type="submit" w="full" onClick={()=>handleSignin()}>
              Login
            </Button>

            <Button mt={6} colorScheme="gray" type="button" w="full" onClick={() => setIsRegister(true)}>
              Register
            </Button>
          </>
        )}
      </Box>
    </Center>
  );
};

export default RenderLogin;
