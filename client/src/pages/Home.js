import { Box, Button, FormControl, Input, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { ImSearch } from 'react-icons/im';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalWrapper";
import Row from "../components/Row";
import DrawerUser from "../components/DrawerUser";

function Home(props) {
    const { getAllUsers, users, Search, getCurrentUser } = useContext(GlobalContext)
    const [query, setQuery] = useState('')

    useEffect(() => {
        getAllUsers();
        getCurrentUser();
    }, []);

    return (
        <div>
            <Box rounded={"lg"} shadow={"base"} p="4">
                <Box mt="2" gap={'2'} mb="4" display={'flex'}>
                    <FormControl>
                        <Input type="text" onChange={(e) => setQuery(e.target.value)} />
                    </FormControl>
                    <Button
                        leftIcon={<ImSearch />}
                        colorScheme="teal"
                        variant="outline"
                        maxW="300px"
                        minW="150px"
                        onClick={() => Search(query)}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
            <Box mt="5" rounded={'lg'} boxShadow="base">
                <Box p="4" display={'flex'} justifyContent="space-between">
                    <Text fontSize="xl" fontWeight="bold">
                        List Users
                    </Text>
                </Box>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Avatar</Th>
                                <Th>FullName</Th>
                                <Th>Email</Th>
                                <Th>Age</Th>
                                <Th>Country</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users?.map(({ _id, fullName, email, age, country }) => (
                                <Row
                                    id={_id}
                                    fullName={fullName}
                                    email={email}
                                    age={age}
                                    country={country}
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <DrawerUser />
        </div>
    );
}

export default Home;