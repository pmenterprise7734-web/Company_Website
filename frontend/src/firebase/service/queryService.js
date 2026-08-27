import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase";


// Add Query
export const addQuery = async (
  queryData
) => {
  const docRef = await addDoc(
    collection(db, "queries"),
    {
      ...queryData,
      read: false
    }
  );

  return docRef.id;
};


// Get All Queries
export const getAllQueries = async () => {
  const snapshot = await getDocs(
    collection(db, "queries")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};


// Mark As Read
export const markAsRead = async (
  id
) => {
  await updateDoc(
    doc(db, "queries", id),
    {
      read: true
    }
  );
};