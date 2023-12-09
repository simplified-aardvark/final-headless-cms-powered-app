import { db } from "../firebase";
import {
    doc,
    deleteDoc,
} from "firebase/firestore";

const deleteRecord = async (docId, coll) => {
    try {
        const todoRef = doc(db, coll, docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};

export {deleteRecord}