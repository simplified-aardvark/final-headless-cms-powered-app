import React from "react";
import { 
    Box,
    Heading,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc, 
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";


const ContactItem = ({itemData}) => {
    //enforce user login
    const {user} = useAuth() || {};

    //check to  see if user is logged in
    if (!user) {
        return;
    }

    return (
        <>
            <Box bg={"yellow"} padding={5}>
                <Heading as="h3" fontSize= {"xl"} ml={2}>
                    {itemData.firstName + " " + itemData.lastName}
                </Heading>

                <Text 
                    border={"solid purple"}
                    padding={2}
                     mb={2}
                >
                    {itemData.phone}
                </Text>

                <Text
                    border={"solid black"}
                    bg = {"blue.300"}
                    padding={2} 
                    mb={2}
                >
                    {itemData.email}
                </Text>

                <Text
                    padding={2} 
                    mt={4}
                    fontSize={"small"}
                >
                    Created on: {new Date(itemData.createdAt).toLocaleDateString()}
                </Text>
            </Box>
        </>
    );
    
};

export async function getServerSideProps(context) {
    let itemData = null;
    
    const docRef = doc(db, "contact", context.params.id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        itemData = docSnap.data();
    }

    return {
        props: {
            itemData
        }
    };
}

export default ContactItem;