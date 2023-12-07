import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center,
    useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import useAuth from "../hooks/useAuth";
import { FaTrash } from "react-icons/fa"; 
import { deleteEvent, findStatus } from "../api/calendar-event";
import { doUseEffect } from "@/api/use-effect";


const CalendarEventList = () => {
    const secondaryTextColor = useColorModeValue("black", "gray.800")

    const [calendar_events, setCalendarEvents] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();

    doUseEffect(setCalendarEvents, "event", user);

    const handleEventDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this calendar event?")) {
            deleteEvent(id);
            toast({ title: "Calendar event deleted successfully", status: "success" });
        }
    };

    return (
        <Box mt={5} mb={50}>
            <Center>
                <Heading as="h1" mb={10}>Calendar Events</Heading>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {calendar_events &&
                calendar_events.map((calendar_event) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key={calendar_event.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            <a href={"/calendar-event/"+ calendar_event.id}>{calendar_event.title}</a>
                            <Badge
                                color="red.500"
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={() => handleEventDelete(calendar_event.id)}
                            >
                                <FaTrash />
                            </Badge>
                            
                            <Badge
                                float="right"
                                opacity="0.8"
                                bg={findStatus(calendar_event.event_date) == "Already Passed." ? "purple.200" : "blue.300"}
                                color={secondaryTextColor}
                                py={"1px"}
                            >
                                {findStatus(calendar_event.event_date)}
                            </Badge>
                        </Heading>
                        <Text>{
                            new Date(calendar_event.event_date).toLocaleDateString() + " @ " 
                            + new Date(calendar_event.event_date).toLocaleTimeString()
                        }</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default CalendarEventList;