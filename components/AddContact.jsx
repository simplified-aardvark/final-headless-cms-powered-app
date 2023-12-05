import React from "react";
import {
    Box,
    Input,
    Button,
    Stack,
    Select,
    useToast,
    Heading,
    Center,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addContact } from "../api/contact";

const AddContact = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [relationship, setRelationship] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
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
        setIsLoading(true);
        const contact = {
            firstName,
            lastName,
            email,
            phone,
            relationship,
            userId: user.uid,
        };
        await addContact(contact);
        setIsLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setRelationship("");
        toast({ title: "Contact created successfully", status: "success" });
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Center><Heading as="h2">Enter a New Contact</Heading></Center>
                <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                    placeholder="Relationship"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                />
                <Button
                    disabled={
                        firstName.length < 1 
                        || lastName.length < 1 
                        || phone < 1
                        || email < 1
                        || isLoading
                    }
                    onClick={() => handleContactCreate()}
                    colorScheme="teal"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};
export default AddContact;