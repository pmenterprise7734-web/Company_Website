import React from 'react'
import imageCompression from 'browser-image-compression'

export const CompressImage = async (file,size) => {
//   const maxSizeMB = 0.5; // 500 KB

  const options = {
    maxSizeMB:`${size? size:0.5}`,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);

    return new File(
      [compressedFile],
      file.name.replace(/\.[^/.]+$/, ".webp"),
      {
        type: "image/webp",
      }
    );
  } catch (error) {
    console.error(error);
    return file;
  }
};