import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase";

// Get All Categories
export const getCategories = async () => {
  const snapshot = await getDocs(
    collection(db, "catagories")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Add Category
export const addCategory = async (categoryData) => {
  const docRef = await addDoc(
    collection(db, "catagories"),
    categoryData
  );

  return docRef.id;
};

// Change Visibility
export const changeVisibility = async (
  id,
  currentStatus
) => {
  await updateDoc(
    doc(db, "catagories", id),
    {
      status: !currentStatus
    }
  );
};

// Update Category
export const updateCategory = async (
  id,
  updateData
) => {
  await updateDoc(
    doc(db, "catagories", id),
    updateData
  );
};

// Delete Category
export const deleteCategory = async (id) => {
  await deleteDoc(
    doc(db, "catagories", id)
  );
};