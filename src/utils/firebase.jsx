import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection,getDocs,query, where,deleteDoc,doc,updateDoc} from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDiibz5k_SgZEhlFLHYtIkc_v-ncPKhL3s",
  authDomain: "olx-react-clone-53264.firebaseapp.com",
  projectId: "olx-react-clone-53264",
  storageBucket: "olx-react-clone-53264.firebasestorage.app",
  messagingSenderId: "291974840648",
  appId: "1:291974840648:web:1df5862da5db910d60f37d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);

// Fetching products
const fetchFromFireStore = async () => {
  try {
    const productsCollection = collection(fireStore, "products");
    const productSnapshot = await getDocs(productsCollection);

    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Fetched products from Firestore", productList);
    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore: ", error);
    return [];
  }
};
//for each user 
export const fetchUserAds = async (userId) => {
  try {
    const productsRef = collection(fireStore, 'products');
    const userAdsQuery = query(productsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(userAdsQuery);

    const userAds = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return userAds;
  } catch (error) {
    console.error('Error fetching user ads:', error);
    return [];
  }
};

// Delete a product
export const deleteAdById = async (adId) => {
  const remove = doc(fireStore, 'products', adId);
  await deleteDoc(remove);
};

//edit a product
export const updateAdById = async (adId, updatedData) => {
  const edit = doc(fireStore, 'products', adId);
  await updateDoc(edit, updatedData);
};

export {
  auth,
  fetchFromFireStore,
  provider,
  storage,
  fireStore
};
