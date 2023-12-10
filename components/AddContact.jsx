import React, { useState } from 'react';
import {
    Input,
    Button,
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
    Divider,
    FormHelperText
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addRecord } from '@/api/add-record';
import { getRelColor } from '../api/contact';

const AddContact = () => {
    const [headerName, setHeaderName] = useState("Contact Name")
    const [inputFirstName, setInputFirstName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputRelationship, setInputRelationship] = useState("Work");

    const familyBgColor = useColorModeValue("green.300", "green.600");
    const friendBgColor = useColorModeValue("yellow.200", "yellow.500");
    const workBgColor = useColorModeValue("red.200", "red.600");
    const secondaryTextColor = useColorModeValue("black", "gray.600");
    const helperTextColor = useColorModeValue("black", "gray.100");

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

    const toast = useToast();
    const { isLoggedIn, user } = useAuth();

    const handleContactCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a contact",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const contact = {
            firstName: inputFirstName,
            lastName: inputLastName,
            email: inputEmail,
            phone: inputPhone,
            relationship: inputRelationship,
            user: user.uid,
        };

        let sendDataResponse = await addRecord("contact", contact);

        if (sendDataResponse) {
            setInputFirstName(" ");
            setInputLastName("");
            setInputEmail("");
            setInputPhone("");
            setInputRelationship("Work")
            setHeaderName("Contact")
            toast({ title: "Contact created successfully", status: "success" });
        } else {
            toast({ title: "Creation of Contact failed.", status: "error" });
        }
    };
    return (
        <>
            <Container
                bg={bgColorSelect(inputRelationship)}
                maxW={"container.xl"}
            >
                <Flex justify={"center"} align={"center"} >
                    <VStack width={"100%"}>
                        <VStack spacing={2} alignItems={'flex-start'} width={["100%", null, "80%"]}>
                            <Heading as="h2" mt={4} mb={2} h={"43px"} alignSelf={"center"}>
                                {headerName}
                            </Heading>

                            <FormControl  >
                                <FormLabel ml={3}>First Name:</FormLabel>
                                <Input
                                    type="text"
                                    value={inputFirstName}
                                    onChange={
                                        (e) => {
                                            setInputFirstName(e.target.value);
                                            setHeaderName(e.target.value + " " + inputLastName);
                                        }
                                    }
                                    placeholder="First Name"
                                    border={"solid"}
                                />
                            </FormControl>

                            <FormControl  >
                                <FormLabel ml={3}>Last Name:</FormLabel>
                                <Input
                                    type="text"
                                    value={inputLastName}
                                    onChange={
                                        (e) => {
                                            setInputLastName(e.target.value);
                                            setHeaderName(inputFirstName + " " + e.target.value);
                                        }
                                    }
                                    placeholder="Last"
                                    border={"solid"}
                                />
                            </FormControl>

                            <Divider />

                            <FormControl  >
                                <FormLabel ml={3}>Email:</FormLabel>
                                <Input
                                    type="text"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    placeholder="Email"
                                    border={"solid"}
                                />
                                <FormHelperText
                                    ml={3}
                                    color={helperTextColor}
                                >Example: blank@empty.com</FormHelperText>
                            </FormControl>

                            <Divider />

                            <FormControl  >
                                <FormLabel ml={3}>Phone:</FormLabel>
                                <Input
                                    type="text"
                                    value={inputPhone}
                                    onChange={(e) => setInputPhone(e.target.value)}
                                    placeholder="Phone"
                                    border={"solid"}
                                />
                                <FormHelperText
                                    ml={3}
                                    color={helperTextColor}
                                >Format: (xxx) xxx-xxxx</FormHelperText>
                            </FormControl>


                            <Divider />

                            <FormControl>
                                <FormLabel id={"status_label"} ml={3}>Relationship:</FormLabel>
                                <Select
                                    border={"solid"}
                                    bg={getRelColor(inputRelationship)}
                                    color={secondaryTextColor}
                                    value={inputRelationship}
                                    onChange={(e) => setInputRelationship(e.target.value)}
                                >
                                    <option>Family</option>
                                    <option>Friend</option>
                                    <option>Work</option>
                                </Select>
                            </FormControl>
                        </VStack>
                        <Center>
                            <Button
                                mt={2}
                                mb={8}
                                onClick={() => handleContactCreate()}
                                w={["100%", null, "20vw"]}
                                colorScheme={"blue"}
                                isDisabled = { inputFirstName == "" || inputPhone==""}
                            >
                                Add Contact
                            </Button>
                        </Center>
                    </VStack>
                </Flex>
            </Container>        
        </>
    );
};

export default AddContact;