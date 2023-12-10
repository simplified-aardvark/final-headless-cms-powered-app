import React, { useState } from 'react';
import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center,
    useColorModeValue,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import { doUseEffect } from "@/api/use-effect";
import { deleteRecord } from '@/api/delete-record';


const ContactList = () => {
    const secondaryTextColor = useColorModeValue("black", "white");

    const [contacts, setContacts] = useState([]);

    const familyBgColor = useColorModeValue("green.300", "green.600");
    const friendBgColor = useColorModeValue("yellow.200", "yellow.500");
    const workBgColor = useColorModeValue("red.200", "red.600");

    const bgColorSelect = (rel) => {
        switch (rel) {
            case "Family":
                return familyBgColor;

            case "Friend":
                return friendBgColor;
        
            default:         //assume Work
                return workBgColor;
        }
    }



    const { user } = useAuth();
    const toast = useToast();

    doUseEffect(setContacts, "contact", user);

    const handleContactDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this contact?")) {
            deleteRecord(id, "contact");
            toast({ title: "Contact deleted successfully", status: "success" });
        }
    };

    return (
        
        <Box mt={5} mb={50}>
            <Center>
                <Heading as="h1" mb={10}>Contacts</Heading>
            </Center>

            <SimpleGrid columns={{ base: 1,  md: 2, lg: 3 }} spacing={8}>
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
                                bg = {bgColorSelect(contact.relationship)}
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
                                onClick={() => handleContactDelete(contact.id)}
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