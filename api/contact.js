import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const addContact = async ({ userId, firstName, lastName, email, phone, relationship }) => {
    try {
        await addDoc(collection(db, "contact"), {
            user: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            relationship: relationship,
            createdAt: new Date().getTime(),
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
export { addContact, deleteContact };