import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

function InputsGroup({ name, onChange, errors, value, type }) {
    return (
        <FormControl isInvalid={errors}>
            <FormLabel>{name}</FormLabel>
            <Input type={type} name={name} onChange={onChange} value={value} />
            {errors &&
                errors?.map((err) => {
                    return <FormErrorMessage>{err}</FormErrorMessage>;
                })}
        </FormControl>
    );
}

export default InputsGroup;