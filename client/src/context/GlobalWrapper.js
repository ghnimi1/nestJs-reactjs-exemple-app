import { createContext, useState } from 'react'
import axios from "axios"
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext()

export default function ProviderContext({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [errors, setErrors] = useState([]);
    const toast = useToast()
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const getAllUsers = () => {
        axios
            .get('/api/users')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err.reponse.data);
            });
    }

    const signin = (user, navigate) => {
        axios.post('/api/auth/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.token)

                toast({
                    title: 'success login',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('/')
                setErrors({});
            })
            .catch(err => {
                setErrors(err.response.data.error)
            })
    }

    const signup = (user, navigate) => {
        axios.post('/api/auth/register', user)
            .then(res => {
                toast({
                    title: 'success register',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('/login')
                setErrors({});
            })
            .catch(err => setErrors(err.response.data.error))
    }

    const addUser = (user, setUser) => {
        axios.post('/api/users', user)
            .then(res => {
                setUsers([...users, res.data])
                toast({
                    title: 'User Added',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                setErrors({});
                setUser({});
                onClose();
            })
            .catch(err => setErrors(err.response.data.error))
    }

    const getCurrentUser = async () => {
        await axios
            .get(`/api/users/me`, config)
            .then((res) => {
                setCurrentUser(res.data);
            })
            .catch((err) => {
                setErrors(err.response.data.error);
            });
    };

    const getUser = async (id) => {
        await axios
            .get(`/api/users/${id}`, config)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                setErrors(err.response.data.error);
            });
    };

    const updateUser = (form, setForm, id) => {
        axios
            .patch(`/api/users/${id}`, form, config)
            .then((res) => {
                toast({
                    title: 'User Updated',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                setErrors({});
                setForm({});
                onClose();
                getAllUsers();
            })
            .catch((err) => {
                setErrors(err.response.data.error);
            });
    };
    const Search = (query) => {
        axios.post(`/api/users/search?key=${query}`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err.response.data))
    }
    const Delete = (id) => {
        axios
            .delete(`/api/users/${id}`, config)
            .then((res) => {
                setUsers(users.filter(user => user._id !== id));
                toast({
                    title: 'User Deleted',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.log(err.reponse.data);
            });
    }
    return (
        <GlobalContext.Provider value={{
            signup,
            signin,
            getAllUsers,
            getCurrentUser,
            currentUser,
            Delete,
            Search,
            addUser,
            updateUser,
            users,
            user,
            setUser,
            getUser,
            setErrors,
            errors,
            isOpen,
            onOpen,
            onClose
        }}>
            {children}
        </GlobalContext.Provider >
    )
}