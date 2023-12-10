import React, { useState } from 'react';
import {
    Input,
    Button,
    Textarea,
    useToast,
    Heading,
    Text,
    Center,
    Container,
    useColorModeValue,
    Flex,
    VStack,
    FormControl,
    FormLabel
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { findStatus, formatDate } from "../api/calendar-event";
import { addRecord } from '@/api/add-record';


const AddCalendarEvent = () => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputEventDate, setInputEventDate] = useState(formatDate(new Date()));
    const [statusText, setStatusText] = useState("Today");
    const [headerTitle, setHeaderTitle] = useState("Title")

    const upcomingBgColor = useColorModeValue("blue.200", "blue.600");
    const passedBgColor = useColorModeValue("purple.200", "purple.600");
    const todayBgColor = useColorModeValue("green.200", "green.600");

    const bgColorSelect = (status) => {
        switch (status) {
            case "Upcoming":
                return upcomingBgColor;

            case "Already Passed":
                return passedBgColor;

            default:         //assume Today
                return todayBgColor;
        }
    }

    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleEventCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create an event",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const calendarEvent = {
            title: inputTitle,
            description: inputDescription,
            event_date: inputEventDate,
            user: user.uid,
        };

        let sendDataResponse = await addRecord("event", calendarEvent);

        if (sendDataResponse) {
            setInputTitle("");
            setHeaderTitle("Title")
            setInputDescription("");
            setInputEventDate(formatDate(new Date()));
            toast({ title: "Event created successfully", status: "success" });
        } else {
            toast({ title: "Creation of Event failed.", status: "error" });
        }
    };
    return (
        <>
            <Container
                bg={bgColorSelect(findStatus(inputEventDate))}
                maxW={"container.xl"}
            >
                <Flex justify={"center"} align={"center"} >
                    <VStack width={"100%"}>
                        <VStack spacing={2} alignItems={'flex-start'} width={["100%", null, "80%"]}>
                            <Heading as="h2" mt={4} mb={2} alignSelf={"center"}>
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
                                <Input
                                    size="md"
                                    type="datetime-local"
                                    value={inputEventDate}
                                    border={'solid'}
                                    onChange={
                                        (e) => {
                                            setStatusText(findStatus(e.target.value));
                                            setInputEventDate(e.target.value)
                                        }
                                    }
                                />
                                <Center>
                                    <Text height={"6"} mt={3}>{statusText}</Text>
                                </Center>
                            </FormControl>
                        </VStack>
                        <Center>
                            <Button
                                mb={8}
                                mt={2}
                                onClick={() => handleEventCreate()}
                                w={["100%", null, "20vw"]}
                                colorScheme={"blue"}
                                isDisabled = {inputTitle == ""}
                            >
                                Create Event
                            </Button>
                        </Center>
                    </VStack>
                </Flex>
            </Container>
        </>
    );
};

export default AddCalendarEvent;

