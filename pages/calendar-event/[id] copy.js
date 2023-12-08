import React from "react";
import { 
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc, getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { findStatus, formatDateAtTime } from "../../api/calendar-event";


const EventItem = ({itemData}) => {
    //enforce user login
    const {user} = useAuth() || {};

    //check to  see if user is logged in
    if (!user) {
        return;
    }

    return (
        <>
            <Box bg={itemData.status == "Upcoming." ? "blue.100" : "purple.100"} padding={5}>
                <Heading as="h3" fontSize= {"xl"} ml={2}>
                    {formatDateAtTime(itemData.event_date)}: {itemData.title}
                </Heading>

                <Text 
                    border={"solid purple"}
                    padding={2}
                     mb={2}
                >
                    {itemData.description}
                </Text>

                <Text
                    border={"solid black"}
                    bg = {itemData.status == "Upcoming." ? "blue.300" : "purple.200"}
                    padding={2} 
                    mb={2}
                >
                    {itemData.status}
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
    
    const docRef = doc(db, "event", context.params.id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        itemData = docSnap.data();
        // itemData.status = findStatus(itemData.event_date);
    }

    return {
        props: {
            itemData
        }
    };
}


export default EventItem;