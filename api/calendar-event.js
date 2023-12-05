import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const addCalendarEvent = async ({ userId, title, description, event_date }) => {
    try {
        await addDoc(collection(db, "event"), {
            user: userId,
            title: title,
            description: description,
            event_date: event_date,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};

const findStatus = (event_date) => {
    if (new Date(event_date) - new Date() > 0) {
        return "Upcoming."
    } else {
        return "Already Passed."
    }
}

const deleteEvent = async (docId) => {
    try {
        const eventRef = doc(db, "event", docId);
        await deleteDoc(eventRef);
    } catch (err) {
        console.log(err);
    }
};

export { 
    addCalendarEvent,
    findStatus,
    deleteEvent 
};