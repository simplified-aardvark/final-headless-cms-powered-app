import React, { useState } from 'react';
import {
    Input,
    Button,
    Textarea,
    Select,
    useToast,
    Heading,
    Center,
    Container,
    useColorModeValue,
    Flex,
    VStack,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addRecord } from '@/api/add-record';

const AddTodo = () => {
    const [inputTitle, setInputTitle] = useState("");
    const [headerTitle, setHeaderTitle] = useState("Title")
    const [inputDescription, setInputDescription] = useState("");
    const [inputStatus, setInputStatus] = useState("pending");

    const completedBgColor = useColorModeValue("green.200", "green.600");
    const pendingBgColor = useColorModeValue("yellow.200", "yellow.600");
    const secondaryTextColor = useColorModeValue("black", "gray.600");

    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const todo = {
            title: inputTitle,
            description: inputDescription,
            status: inputStatus,
            user: user.uid,
        };
        
        let sendDataResponse = await addRecord("todo", todo);

        if (sendDataResponse) {
            setInputTitle(" ");
            setHeaderTitle("Title")
            setInputDescription("");
            setInputStatus("pending");
            toast({ title: "To-Do created successfully", status: "success" });
        } else {
            toast({ title: "Creation of To-Do failed.", status: "error" });
        }        
    };

    return (
        <>
            <Container
                bg={inputStatus == "pending" ? pendingBgColor : completedBgColor}
                maxW={"container.xl"}
            >
                <Flex justify={"center"} align={"center"} >
                    <VStack width={"100%"}>
                        <VStack spacing={2} alignItems={'flex-start'} width={["100%", null, "80%"]}>
                            <Heading as="h2" mt={4} mb={2} h={"43px"} alignSelf={"center"}>
                                {headerTitle}
                            </Heading>
                            <FormControl  >
                                <FormLabel ml={3}>Title:</FormLabel>
                                <Input
                                    type="text"
                                    value={inputTitle}
                                    onChange={
                                        (e) => {
                                            setInputTitle(e.target.value);
                                            setHeaderTitle(e.target.value);
                                        }
                                    }
                                    placeholder="Title"
                                    border={"solid"}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel id={"description_label"} ml={3}>Description:</FormLabel>
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
                                <FormLabel id={"status_label"} ml={3}>Status:</FormLabel>
                                <Select
                                    border={"solid"}
                                    bg={inputStatus == "pending" ? "yellow.400" : "green.400"}
                                    value={inputStatus == "pending" ? "Pending ⌛" : "Completed ✅"}
                                    color={secondaryTextColor}
                                    onChange={(e) => setInputStatus((e.target.value == "Pending ⌛" ? "pending" : "completed"))}
                                >
                                    <option>Pending ⌛</option>
                                    <option>Completed ✅</option>
                                </Select>
                            </FormControl>
                        </VStack>
                        <Center>
                            <Button
                                mt={2}
                                mb={8}
                                onClick={() => handleTodoCreate()}
                                w={["100%", null, "20vw"]}
                                colorScheme={"blue"}
                                isDisabled = {inputTitle == ""}
                            >
                                Add To-Do
                            </Button>
                        </Center>
                    </VStack>
                </Flex>
            </Container>
        </>
    );
};

export default AddTodo;