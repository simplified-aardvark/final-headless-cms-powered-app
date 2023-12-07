import React from "react";

import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
    Heading,
    Text,
    Center
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addCalendarEvent } from "../api/calendar-event";

const AddCalendarEvent = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [event_date, set_event_date] = React.useState(""); 
    const [statusText, setStatusText] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleEventCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const todo = {
            title,
            description,
            event_date,
            userId: user.uid,
        };
        await addCalendarEvent(todo);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        set_event_date("");
        setStatusText("");
        toast({ title: "Calendar Event created successfully", status: "success" });
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block">
            <Stack direction="column">
                <Center><Heading as="h2">Enter New Calendar Event</Heading></Center>
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    size="md"
                    type="date"
                    onChange={
                        (e) => {
                            let chosen_date = new Date(e.target.value);
                            let date_now = new Date();
                            set_event_date(chosen_date.getTime());

                            if (chosen_date - date_now > 0) {
                                console.log("future");
                                setStatusText("Upcoming.");
                            } else {
                                console.log("past");
                                setStatusText("Already Passed.");
                            }
                        }
                    }
                />
                <Center>
                    <Text height={"6"}>{statusText}</Text>
                </Center>    
                
                <Button
                    onClick={() => handleEventCreate()}
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    colorScheme="teal"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};

export default AddCalendarEvent;

function clipISOstring(str) {
    return str.substring(0, str.length -14);
}