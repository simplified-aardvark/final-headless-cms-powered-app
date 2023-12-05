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


const TodoItem = ({itemData}) => {
    //enforce user login
    const {user} = useAuth() || {};

    //check to  see if user is logged in
    if (!user) {
        return;
    }

    return (
        <>
            <Box bg={itemData.status == "pending" ? "yellow.200" : "green.200"} padding={5}>
                <Heading as="h3" fontsize= {"xl"} ml={2} mb={2}>
                    {itemData.title}
                </Heading>
                <Text 
                    border={"solid"}
                    padding={2}
                     mb={2}
                >
                    {itemData.description}
                </Text>
                <Text
                    border={"solid black"}
                    bg = {itemData.status == "pending" ? "yellow.400" : "green.400"}
                    padding={2} 
                    mb={2}
                >
                    {itemData.status=="pending" ? "Pending" : "Completed"}
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
    
    const docRef = doc(db, "todo", context.params.id)
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


export default TodoItem;