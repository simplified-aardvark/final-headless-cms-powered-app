import { useEffect } from "react";
import {
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { db } from "../firebase";

const doUseEffect = (stateSetter, coll, user) => {
    useEffect(() => {
        if (!user) {
            stateSetter([]);
            return;
        }
        const q = query(collection(db, coll), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            stateSetter(ar);
        });
    }, [user]);
}

export {doUseEffect}