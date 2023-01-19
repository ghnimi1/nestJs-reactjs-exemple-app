import { Box, Button, Container, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalWrapper';

function Login(props) {
    const { signin, errors } = useContext(GlobalContext)
    const [info, setInfo] = useState({})
    const navigate = useNavigate()
    const onChangeHandler = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogin = () => {
        signin(info, navigate)
    }
    return (
        <Container maxW='550px'>
            <Stack spacing={4} mt='20px'>
                <Box mt="5" p='2' rounded={'lg'} boxShadow="base" w='100%'>
                    <Box p="4">
                        <Text fontSize="xl" fontWeight="bold">
                            Login
                        </Text>
                    </Box>
                    <FormControl isInvalid={errors?.email}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<AiOutlineMail color='gray.300' />}
                            />
                            <Input type='email' placeholder='Enter email' mb='5px'
                                name='email' onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.password}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' children={<RiLockPasswordLine color='green.300' />} />
                            <Input type='password' placeholder='Enter password' mb='5px'
                                name='password' onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.password}</FormErrorMessage>
                    </FormControl>
                    <Box>
                        <Button
                            onClick={handleLogin}
                            w='100%' colorScheme='blue'>Login</Button>
                    </Box>
                    <Text my='20px' textAlign='right'>
                        Don't have an account?{' '}
                        <Link color='green' to='/register'>
                            Register
                        </Link>
                    </Text>
                </Box>

            </Stack>
        </Container >
    );
}

export default Login;