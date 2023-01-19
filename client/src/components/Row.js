import { Avatar, Box, Button, Td, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GlobalContext } from '../context/GlobalWrapper';

function Row({ id, fullName, email, age, country }) {
    const { Delete, onOpen, getUser, currentUser } = useContext(GlobalContext)

    return (
        <Tr>
            <Td>
                <Avatar name={fullName} />
            </Td>
            <Td>{fullName}</Td>
            <Td>{email}</Td>
            <Td>{age}</Td>
            <Td>{country}</Td>
            <Td>
                <Box display="flex" gap="1">
                    {currentUser?._id === id ?
                        (< Button colorScheme={'blue'}>
                            <AiFillEdit
                                onClick={() => {
                                    onOpen()
                                    getUser(id)
                                }}
                            />
                        </Button>)
                        :
                        (<Button colorScheme={'red'} onClick={() => Delete(id)}>
                            <AiFillDelete />
                        </Button>)}
                </Box>
            </Td>
        </Tr >
    );
}

export default Row;