import { Box, Button, Container, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsFileText } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { TbListNumbers } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalWrapper';

function Register(props) {
    const { signup, errors } = useContext(GlobalContext)
    const [info, setInfo] = useState({})
    const navigate = useNavigate()
    const onChangeHandler = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };
    const handleRegister = () => {
        signup(info, navigate)
    }
    return (
        <Container maxW='550px'>
            <Stack spacing={4} mt='20px'>
                <Box mt="5" p='2' rounded={'lg'} boxShadow="base">
                    <Box p="4">
                        <Text fontSize="xl" fontWeight="bold">
                            Register
                        </Text>
                    </Box>
                    <FormControl isInvalid={errors?.fullName}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<BsFileText color='gray.300' />}
                            />
                            <Input type='text' placeholder='Enter fullName'
                                name='fullName' mb='5px'
                                onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.fullName}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.email}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<AiOutlineMail color='gray.300' />}
                            />
                            <Input type='email' placeholder='Enter email' my='5px'
                                name='email' onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.password}>
                        <InputGroup >
                            <InputLeftElement pointerEvents='none' children={<RiLockPasswordLine color='green.300' />} />
                            <Input type='password' placeholder='Enter password' my='5px'
                                name='password' onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.country}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' children={<GoLocation color='green.300' />} />
                            <Input type='text' placeholder='Enter country' my='5px'
                                name='country' onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.country}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.age}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' children={<TbListNumbers color='green.300' />} />
                            <Input type='number' placeholder='Enter age' my='5px'
                                name='age' onChange={onChangeHandler} />
                        </InputGroup>
                        <FormErrorMessage>{errors?.age}</FormErrorMessage>
                    </FormControl>
                    <Box>
                        <Button
                            onClick={handleRegister}
                            w='100%' mt='5px' colorScheme='blue'>Register</Button>
                    </Box>
                    <Text my='20px' textAlign='right'>
                        Already have an account?{' '}
                        <Link to='/login'>
                            Login
                        </Link>
                    </Text>
                </Box>
            </Stack>
        </Container >
    );
}

export default Register;