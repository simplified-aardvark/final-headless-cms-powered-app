import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    InputGroup,
    Input,
    Button,
    Stack,
    HStack
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { sendData } from '@/api/send-data';
import { serverSideFunc } from '@/api/server-side-func';


const TodoItem = ({itemData}) => {
    const [inputTitle, setInputTitle] = useState(itemData.title);
    const [inputDescription, setInputDescription] = useState(itemData.description);
    const [updatedOn, setUpdatedOn] = useState(itemData.updatedOn);
    const [statusMsg, setStatusMsg] = useState('');

    const { user } = useAuth() || {};

    if (!user) {
        return;
    }

    let data = {
        title: inputTitle,
        description: inputDescription,
        updatedOn: updatedOn
    };

    return (
        <>
            <Box bg={itemData.status == "pending" ? "yellow.200" : "green.200"} padding={5}>
                <Heading as="h3" fontSize={"xl"} ml={2} mb={2}>
                    {itemData.title}
                </Heading>
                <InputGroup >
                    <Stack width={"100vw"}>
                        <Input 
                            type="text"
                            value={inputTitle} 
                            onChange={ (e) => setInputTitle(e.target.value)}
                            placeholder="Title" 
                        />
                        <Input 
                            type="text"
                            value={inputDescription} 
                            onChange = {(e) => setInputDescription(e.target.value)}
                            placeholder="Description" 
                            border={"solid"}
                            padding={2}
                            mb={2}
                        />
                    </Stack>
                </InputGroup>
            
                <Text
                    border={"solid black"}
                    bg={itemData.status == "pending" ? "yellow.400" : "green.400"}
                    padding={2}
                    mb={2}
                >
                    {itemData.status == "pending" ? "Pending" : "Completed"}
                </Text>
                
                <Button
                    ml={2}
                    onClick={() => {
                        setUpdatedOn(new Date().getTime());
                        sendData(itemData.docId, "todo", data, setStatusMsg)}
                    }
                >
                    Update
                </Button>
                
                <HStack>
                    <Text
                        padding={2}
                        mt={4}
                        fontSize={"small"}
                    >
                        Created On: {new Date(itemData.createdAt).toLocaleDateString()}
                        
                    </Text>
                    <Text
                        padding={2}
                        mt={4}
                        fontSize={"small"}
                    >
                        Updated On: {new Date(updatedOn).toLocaleDateString()}
                    </Text>
                </HStack>
            </Box>
        </>
    );

};

export async function getServerSideProps(context) {
    return serverSideFunc(context, "todo");
}


export default TodoItem;