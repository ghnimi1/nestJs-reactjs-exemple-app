import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Stack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/GlobalWrapper"
import InputsGroup from "./InputsGroup"

export default function DrawerUser() {
    const { isOpen, onClose, errors, setErrors, user, updateUser } = useContext(GlobalContext)
    const [info, setInfo] = useState({});
    const onChangeHandler = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        setInfo(user)
    }, [user])
    return (
        <>
            <Drawer isOpen={isOpen}
                placement="right"
                onClose={() => {
                    onClose();
                    setErrors({});
                    setInfo({});
                }}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton
                        onClick={() => {
                            onClose();
                            setErrors({});
                            setInfo({});
                        }} />
                    <DrawerHeader>Create / Update User</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={"24px"}>
                            <InputsGroup name='fullName'
                                type='text'
                                onChange={onChangeHandler}
                                errors={errors?.fullName}
                                value={info?.fullName} />
                            <InputsGroup name='email'
                                type='email'
                                onChange={onChangeHandler}
                                errors={errors?.email}
                                value={info?.email} />
                            <InputsGroup name='password'
                                type='password'
                                onChange={onChangeHandler}
                                errors={errors?.password}
                                value={info?.password} />
                            <InputsGroup name='age'
                                type='text'
                                onChange={onChangeHandler}
                                errors={errors?.age}
                                value={info?.age} />
                            <InputsGroup name='country'
                                type='text'
                                onChange={onChangeHandler}
                                errors={errors?.country}
                                value={info?.country} />
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3}
                            onClick={() => {
                                onClose();
                                setErrors({});
                                setInfo({});
                            }}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={() => updateUser(info, setInfo, info._id)}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}