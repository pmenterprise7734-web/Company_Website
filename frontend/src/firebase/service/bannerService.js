import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase";

export const getAllBanners = async () => {
  const snapshot = await getDocs(
    collection(db, "banners")
  );

  // console.log("snapshot:" , snapshot.toJSON)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const addBanner = async (url) => {
  await addDoc(
    collection(db, "banners"),
    {
      imgUrl: url
    }
  );
};

export const deleteBanner = async (id) => {
  await deleteDoc(
    doc(db, "banners", id)
  );
};