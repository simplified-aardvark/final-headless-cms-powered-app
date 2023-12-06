import {
    doc, updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

const sendData = async (docId, coll, data, statusSetter) => {
    const docRef = doc(db, coll, docId);
    updateDoc(
        docRef,
        data
    ).then(
        docRef => {
            statusSetter("Updated!");
        }
    ).catch(
        error => {
            console.log(error);
            statusSetter("Error!");
        }
    );
}

export {sendData}