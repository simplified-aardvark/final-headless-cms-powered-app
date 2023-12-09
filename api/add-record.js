import { db } from "../firebase";
import {
    collection,
    addDoc,
} from "firebase/firestore";

const addRecord = async (coll, data) => {
    let isUpdated = false;
    let time = new Date().getTime();

    data.createdAt = time;
    data.updatedOn = time;

    try {
        await addDoc(collection(db, coll), data);
        isUpdated = true
    } catch (err) {}

    return isUpdated;
};

export { addRecord }