import {
    doc, updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

const sendData = async (docId, coll, data) => {
    const docRef = doc(db, coll, docId);
    let isUpdated = false;

    await updateDoc(
        docRef,
        data
    ).then(
        docRef => {
            console.log("Successfully Updated!");
            isUpdated = !isUpdated
        }
    ).catch(
        error => {
            console.log(error);
        }
    );

    return isUpdated;
}

export {sendData}