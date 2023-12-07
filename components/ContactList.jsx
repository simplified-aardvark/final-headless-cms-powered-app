import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center,
    useColorModeValue,
    Switch
} from "@chakra-ui/react";

import React from "react";
import useAuth from "../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import { deleteContact } from "../api/contact";
import { doUseEffect } from "@/api/use-effect";


const ContactList = () => {
    const secondaryTextColor = useColorModeValue("black", "gray.700");
    const getRelColor = (rel) => {
        switch (rel) {
            case "Family":
                return "green.300"

            case "Friend":
                return "yellow.200"
        
            default:         //assume Work
                return "red.200"
        }
    }

    const [contacts, setContacts] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();

    doUseEffect(setContacts, "contact", user);

    const handleContactDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this contact?")) {
            deleteContact(id);
            toast({ title: "Contact deleted successfully", status: "success" });
        }
    };

    return (
        
        <Box mt={5} mb={50}>
            <Center>
                <Heading as="h1" mb={10}>Contacts</Heading>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {contacts &&
                contacts.map((contact) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key={contact.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            <a href={"/contact/"+ contact.id}>
                                {contact.firstName + " " + contact.lastName}
                            </a>
                            <Badge
                                float="right"
                                opacity="0.8"
                                bg = {getRelColor(contact.relationship)}
                                color={secondaryTextColor}
                                py={"1px"}
                            >
                                {contact.relationship}
                            </Badge>
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
                                onClick={() => handleContactDelete(todo.id)}
                            >
                                <FaTrash />
                            </Badge>
                        </Heading>
                        <Text>{contact.phone}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ContactList;