import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

import { app } from "./Firestore.js";

const saveImageFirestore = async (image) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, "orders/" + image.name);
  const snapshot = await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(snapshot.ref);
  return imageUrl;
};
export { saveImageFirestore };
