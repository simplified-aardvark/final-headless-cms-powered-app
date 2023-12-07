import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    InputGroup,
    Input,
    Button,
    Stack,
    HStack,
    useToast,
    Center,
    Container,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    Select,
    useColorModeValue,
    Textarea
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { sendData } from '@/api/send-data';
import { serverSideFunc } from '@/api/server-side-func';


const TodoItem = ({ itemData }) => {
    const completedBgColor = useColorModeValue("green.200", "green.600");
    const pendingBgColor = useColorModeValue("yellow.200", "yellow.600");
    const secondaryTextColor = useColorModeValue("black", "gray.600");

    const [inputTitle, setInputTitle] = useState(itemData.title);
    const [inputDescription, setInputDescription] = useState(itemData.description);
    const [updatedOn, setUpdatedOn] = useState(itemData.updatedOn);
    const [inputStatus, setStatus] = useState(itemData.status);
    const [statusMsg, setStatusMsg] = useState('');
    const toast = useToast();
    const { user } = useAuth() || {};

    if (!user) {
        return;
    }

    let data = {
        title: inputTitle,
        description: inputDescription,
        updatedOn: updatedOn,
        status: inputStatus
    };

    const hondleTodoUpdate = async () => {
        setUpdatedOn(new Date().getTime());
        await sendData(itemData.docId, "todo", data, setStatusMsg);
        toast({ title: "Todo updated successfully", status: "success" });
    }

    return (
        <>
            <Container
                bg={inputStatus == "pending" ? pendingBgColor : completedBgColor}
                maxW={"container.xl"}
            >
                <Flex justify={"center"} align={"center"} >
                    <VStack width={"100%"}>
                            <VStack spacing={2} alignItems={'flex-start'} width={["100%", null, "80%"]}>
                                <Heading as="h2" ml={2} mb={2} alignSelf={"center"}>
                                    {inputTitle}
                                </Heading>
                                <FormControl  >
                                    <FormLabel ml={3}>Title:</FormLabel>
                                    <Input
                                        type="text"
                                        value={inputTitle}
                                        onChange={(e) => setInputTitle(e.target.value)}
                                        placeholder="Title"
                                        border={"solid"}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel id={"description_label"}  ml={3}>Description:</FormLabel>
                                    <Textarea
                                        type="text"
                                        value={inputDescription}
                                        onChange={(e) => setInputDescription(e.target.value)}
                                        placeholder="Description"
                                        border={"solid"}
                                        padding={2}
                                        mb={2}
                                    />
                                </FormControl>
                                <FormControl>
                                <FormLabel id={"status_label"}  ml={3}>Status:</FormLabel>
                                    <Select 
                                        border={"solid"}
                                        bg={inputStatus == "pending" ? "yellow.400" : "green.400"}
                                        value={inputStatus == "pending" ? "Pending ⌛" : "Completed ✅"}
                                        color={secondaryTextColor}
                                        onChange = { (e) => setStatus((e.target.value == "Pending ⌛" ? "pending" : "completed")) }
                                    >
                                        <option>Pending ⌛</option>
                                        <option>Completed ✅</option>
                                    </Select>   
                                </FormControl>
                            </VStack>
                        <Center>
                            <Button
                                mt={2}
                                onClick={() => hondleTodoUpdate()}
                                w={["100%", null, "20vw"]}
                                colorScheme={"blue"}
                            >
                                Update
                            </Button>
                        </Center>
                        <HStack mt={4}>
                            <Text
                                padding={2}
                                fontSize={"small"}
                            >
                                Created On: {new Date(itemData.createdAt).toLocaleDateString()}
                            </Text>
                            <Text
                                padding={2}
                                fontSize={"small"}
                            >
                                Updated On: {new Date(updatedOn).toLocaleDateString()}
                            </Text>
                        </HStack>
                    </VStack>
                </Flex>

                
            </Container>
        </>
    );

};

export async function getServerSideProps(context) {
    return serverSideFunc(context, "todo");
}


export default TodoItem;