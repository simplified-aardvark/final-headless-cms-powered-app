import {
    doc, getDoc
} from "firebase/firestore";
import { db } from "../firebase";

async function serverSideFunc(context, coll) {
    let itemData = null;

    const docRef = doc(db, coll, context.params.id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        itemData = docSnap.data();
        itemData.docId = context.params.id;
    }

    return {
        props: {
            itemData
        }
    };
}

export {serverSideFunc}