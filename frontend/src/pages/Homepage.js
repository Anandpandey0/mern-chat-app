import React from 'react'
import { Tab,Tabs,Container,Box,TabList,TabPanels, TabPanel} from '@chakra-ui/react'
import Login from "../pages/Components/Auth/Login";
import Signup from "../pages/Components/Auth/Signup";


const Homepage = () => {
  return (
    <div >
    
    <Container maxW='2xl'  h='100%'   centerContent>
      
    <Box bg='white' w='50%' p={4} color='black'borderRadius='2xl'   marginTop='1rem' textAlign='center'>
    Socialmedia App
</Box>
      
  <Box padding='4' bg='white' d-flex={'true'?1:0} justifyContent='center'marginTop='1.5rem' borderRadius='2xl' w='100%' color='black' maxW='md'>

    
  <Tabs isFitted variant='soft-rounded'>
  <TabList mb='1em' >
    <Tab >Login</Tab>
    <Tab>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel >
    <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
  </Box>
</Container>
    
    </div>
  )
}

export default Homepage