import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase";


// =======================
// Get All Products
// =======================
export const getProducts = async () => {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};


// =======================
// Get Products By Category
// =======================
export const getProductsByCategory = async (
  category
) => {
  const q = query(
    collection(db, "products"),
    where("catagory", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};


// =======================
// Add Product
// =======================
export const addProduct = async (
  productData
) => {
  const docRef = await addDoc(
    collection(db, "products"),
    {
      ...productData,
      quantity: 1
    }
  );

  return docRef.id;
};


// =======================
// Update Product
// =======================
export const updateProduct = async (
  id,
  updateData
) => {
  await updateDoc(
    doc(db, "products", id),
    updateData
  );
};


// =======================
// Delete Product
// =======================
export const deleteProduct = async (
  id
) => {
  await deleteDoc(
    doc(db, "products", id)
  );
};


// =======================
// Toggle Favorite
// =======================
export const toggleFavorite = async (
  id,
  currentStatus
) => {
  await updateDoc(
    doc(db, "products", id),
    {
      favorite: !currentStatus
    }
  );
};


// =======================
// Get Top Products
// =======================
export const getTopProducts = async () => {
  const q = query(
    collection(db, "products"),
    where("favorite", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};