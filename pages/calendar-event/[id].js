import React, { useState } from 'react';
import {
    Heading,
    Text,
    Input,
    Button,
    HStack,
    useToast,
    Center,
    Container,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    useColorModeValue,
    Textarea
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { updateData } from '@/api/update-data';
import { findStatus } from "../../api/calendar-event";
import { serverSideFunc } from '@/api/server-side-func';


const EventItem = ({ itemData }) => {
    const [inputTitle, setInputTitle] = useState(itemData.title);
    const [inputDescription, setInputDescription] = useState(itemData.description);
    const [inputEventDate, setInputEventDate] = useState(itemData.event_date);
    const [statusText, setStatusText] = useState(findStatus(itemData.event_date));

    const [updatedOn, setUpdatedOn] = useState(itemData.updatedOn);

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
    const { user } = useAuth() || {};

    if (!user) {
        return;
    }

    let data = {
        title: inputTitle,
        description: inputDescription,
        event_date: inputEventDate,
        updatedOn: updatedOn
    };

    const hondleEventUpdate = async () => {
        data.updatedOn = new Date().getTime();
        let sendDataResponse = await updateData(itemData.docId, "event", data)

        if (sendDataResponse) {
            setUpdatedOn(data.updatedOn);
            toast({ title: "Event updated successfully.", status: "success" });
        } else {
            toast({ title: "Event failed to update.", status: "error" });
        }
    }

    return (
        <>
            <Container
                bg={bgColorSelect(statusText)}
                maxW={"container.xl"}
            >
                <Flex justify={"center"} align={"center"} >
                    <VStack width={"100%"}>
                        <VStack spacing={2} alignItems={'flex-start'} width={["100%", null, "80%"]}>
                            <Heading as="h2" mt={4} mb={2} h={"43px"} alignSelf={"center"}>
                                {inputTitle}
                            </Heading>
                            <FormControl  >
                                <FormLabel ml={3}>Title (required):</FormLabel>
                                <Input
                                    type="text"
                                    value={inputTitle}
                                    onChange={(e) => setInputTitle(e.target.value)}
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
                                mt={2}
                                onClick={() => hondleEventUpdate()}
                                w={["100%", null, "20vw"]}
                                colorScheme={"blue"}
                                isDisabled = {inputTitle == ""}
                            >
                                Update Event
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
    return serverSideFunc(context, "event");
}

export default EventItem;