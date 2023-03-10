import React, { useContext } from "react";
import { Box, Flex, Text, Button, Stack, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { SiNestjs } from 'react-icons/si';
import { GlobalContext } from "../context/GlobalWrapper";

const Navbar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Link to='/'>
                <Box w="100px"
                    color={["white", "white", "primary.500", "primary.500"]}>
                    <Text fontSize="lg" fontWeight="bold" display='flex' alignItems='center'>
                        <SiNestjs /> <Text ml='5px' >NestApp</Text>
                    </Text>
                </Box>
            </Link>
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <Link href={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};

const MenuLinks = ({ isOpen }) => {
    const { currentUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem to="/">Home</MenuItem>
                <MenuItem to="/how">How It works </MenuItem>
                <MenuItem to="/faetures">Features </MenuItem>
                {token && <><Link to='/login'
                    onClick={Logout}
                    style={{ cursor: 'pointer' }}>Logout </Link>
                    <Avatar name={currentUser?.fullName} /></>}

                <MenuItem to="/signup" isLast>
                    {!token && <Stack direction='row' spacing={4} >
                        <Link to='/register'>
                            <Button colorScheme='teal' variant='outline'>
                                Register
                            </Button>
                        </Link>
                        <Link to='/login'>
                            <Button colorScheme='teal' variant='solid'>
                                Login
                            </Button>
                        </Link>
                    </Stack>}
                </MenuItem>
            </Stack >
        </Box >
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg='blue.500'
            color={["white", "white", "primary.700", "primary.700"]}
            {...props}
        >
            {children}
        </Flex>
    );
};

export default Navbar;