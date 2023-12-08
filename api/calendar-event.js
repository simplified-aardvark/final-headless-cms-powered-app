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
            updatedOn: createdAt
        });
    } catch (err) { }
};

const findStatus = (event_date) => {
    let e = new Date(event_date);
    let now = new Date();

    if ( e.getFullYear()==now.getFullYear() && e.getMonth() == now.getMonth() && e.getDate() == now.getDate()) {
        return "Today"
    } else if (e - new Date() > 0) {
        return "Upcoming"
    } else {
        return "Already Passed"
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
    let min = d.getMinutes < 10 ? "0"&d.getMinutes() : d.getMinutes();
    let formattedDateStr = year+"-"+month+"-"+day+"T"+hour+":"+min;
    console.log(formattedDateStr);
    return formattedDateStr
}

const formatDateAtTime = (event_date) => {
    let d = new Date(event_date);
    let dateAtTime = d.toLocaleDateString() + " @ " + d.toLocaleTimeString();
    let period = dateAtTime.substring(dateAtTime.length-2);
    dateAtTime = dateAtTime.substring(0, dateAtTime.length - 6) + period;

    return dateAtTime;
}

export { 
    addCalendarEvent,
    findStatus,
    deleteEvent,
    formatDate,
    formatDateAtTime
};