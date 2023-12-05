import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import {  FaCreativeCommonsSamplingPlus, FaTrash } from "react-icons/fa"; //FaToggleOff, FaToggleOn,
import { deleteEvent, findStatus } from "../api/calendar-event";


const CalendarEventList = () => {
    const [calendar_events, setCalendarEvents] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();

    useEffect(() => {
        if (!user) {
            setCalendarEvents([]);
            return;
        }
        const q = query(collection(db, "event"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setCalendarEvents(ar);
        });
    }, [user]);

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
                            <a href={"/calendar-event/"+ calendar_event.id}>{calendar_event.title}{" "}</a>
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
                            >
                                {findStatus(calendar_event.event_date)}
                            </Badge>
                        </Heading>
                        <Text>{calendar_event.description}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default CalendarEventList;