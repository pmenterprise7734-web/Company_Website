import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import { storage } from "../firebase";


// =======================
// Upload Image
// =======================
export const uploadImage = async (
  file,
  folder = "products"
) => {
  try {
    const fileName =
      Date.now() + "-" + file.name;

    const storageRef = ref(
      storage,
      `${folder}/${fileName}`
    );

    await uploadBytes(
      storageRef,
      file
    );

    const downloadURL =
      await getDownloadURL(storageRef);

    return downloadURL;

  } catch (error) {
    console.error(error);
    throw error;
  }
};


// =======================
// Delete Image
// =======================
export const deleteImage = async (
  imageUrl
) => {
  try {
    const imageRef = ref(
      storage,
      imageUrl
    );

    await deleteObject(imageRef);

  } catch (error) {
    console.error(error);
    throw error;
  }
};