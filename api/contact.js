import { db } from "../firebase";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { useColorModeValue } from "@chakra-ui/react";

const addContact = async ({ userId, firstName, lastName, email, phone, relationship}) => {
    try {
        await addDoc(collection(db, "contact"), {
            user: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            relationship: relationship,
            createdAt: new Date().getTime(),
            updatedOn: createdAt
        });
    } catch (err) { }
};

const deleteContact = async (docId) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await deleteDoc(contactRef);
    } catch (err) {
        console.log(err);
    }
};


const getRelColor = (rel) => {
    switch (rel) {
        case "Family":
            return "green.400"

        case "Friend":
            return "yellow.400"
    
        default:         //assume Work
            return "red.400"
    }
}


export { addContact, deleteContact, getRelColor};