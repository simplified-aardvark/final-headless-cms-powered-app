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

const formatDate = (event_date) => {
    let d = new Date(event_date);
    let year = d.getFullYear();
    let month = d.getMonth()+1 < 10 ? "0"+d.getMonth()+1 : d.getMonth()+1;
    let day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
    let hour = d.getHours() < 10 ? "0"+d.getHours() : d.getHours();
    let min = d.getMinutes < 10 ? "0"+d.getMinutes() : d.getMinutes();
    let formattedDateStr = year+"-"+month+"-"+day+"T"+hour+":"+min;
        
    return formattedDateStr
}

export { 
    addCalendarEvent,
    findStatus,
    deleteEvent,
    formatDate 
};