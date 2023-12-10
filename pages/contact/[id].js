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
    Select,
    useColorModeValue,
    FormHelperText, 
    Divider
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { updateData } from '@/api/update-data';
import { serverSideFunc } from '@/api/server-side-func';
import { getRelColor } from '@/api/contact';


const ContactItem = ({itemData}) => {
    const [inputFirstName, setInputFirstName] = useState(itemData.firstName);
    const [inputLastName, setInputLastName] = useState(itemData.lastName);
    const [inputEmail, setInputEmail] = useState(itemData.email);
    const [inputPhone, setInputPhone] = useState(itemData.phone);
    const [inputRelationship, setInputRelationship] = useState(itemData.relationship);

    const [updatedOn, setUpdatedOn] = useState(itemData.updatedOn);

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
    const { user } = useAuth() || {};

    if (!user) {
        return;
    }

    let data = {
        firstName: inputFirstName,
        lastName: inputLastName,
        email: inputEmail,
        phone: inputPhone,
        relationship: inputRelationship,
        updatedOn: updatedOn
    };

    const hondleContactUpdate = async () => {
        data.updatedOn = new Date().getTime();
        let sendDataResponse = await updateData(itemData.docId, "contact", data)

        if (sendDataResponse) {
            setUpdatedOn(data.updatedOn);
            toast({ title: "Contact updated successfully.", status: "success" });
        } else {
            toast({ title: "Contact failed to update.", status: "error" });
        }        
    }

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
                                    {inputFirstName + " " + inputLastName}
                                </Heading>
                                
                                <FormControl  >
                                    <FormLabel ml={3}>First Name (required):</FormLabel>
                                    <Input
                                        type="text"
                                        value={inputFirstName}
                                        onChange={(e) => setInputFirstName(e.target.value)}
                                        placeholder="First Name"
                                        border={"solid"}
                                    />
                                </FormControl>

                                <FormControl  >
                                    <FormLabel ml={3}>Last Name:</FormLabel>
                                    <Input
                                        type="text"
                                        value={inputLastName}
                                        onChange={(e) => setInputLastName(e.target.value)}
                                        placeholder="Last Name"
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
                                    <FormLabel ml={3}>Phone (required):</FormLabel>
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
                                <FormLabel id={"status_label"}  ml={3}>Relationship:</FormLabel>
                                    <Select 
                                        border={"solid"}
                                        bg={getRelColor(inputRelationship)}
                                        color={secondaryTextColor}
                                        value={inputRelationship}
                                        onChange = { (e) => setInputRelationship(e.target.value) }
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
                                onClick={() => hondleContactUpdate()}
                                w={["100%", null, "20vw"]}
                                colorScheme={"blue"}
                                isDisabled = {inputFirstName == "" || inputPhone == ""}
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
    return serverSideFunc(context, "contact");
}

export default ContactItem;