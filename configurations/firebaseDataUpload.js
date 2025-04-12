import { collection, doc, setDoc } from "firebase/firestore";
import { restaurants,carouselImages,slots } from "../store/restaurantData";
import { db } from "./firebaseConfig";

// const restaurantData = restaurants;  //for uploading restaurants data to firebase
// const restaurantData = carouselImages; // for uploading carousels data to firebase
const restaurantData = slots;
const uploadData = async () => {
    try {
        for (let i = 0; i < restaurantData.length; i++) {
            const restaurant = restaurantData[i];
            // const docRef = doc(collection(db, "restaurants"), `restaurants_${i + 1}`); //use this for uploading restaurant data
            const docRef = doc(collection(db, "slots"), `slot_${i + 1}`);
            await setDoc(docRef, restaurant);
        }
        console.log("Data uploaded");
    } catch (e) {
        console.log("Error uploading data", e);
    }
};

export default uploadData;