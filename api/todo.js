import { db } from "../firebase";
import {
    updateDoc,
    doc,
} from "firebase/firestore";

const toggleTodoStatus = async ({ docId, status }) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await updateDoc(todoRef, {
            status,
        });
    } catch (err) {
        console.log(err);
    }
};


export { toggleTodoStatus };