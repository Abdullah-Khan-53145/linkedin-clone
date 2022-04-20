import { signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import db from "../firebase";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});
export function signInAPI() {
  return async (dispatch) => {
    const payload = await signInWithPopup(auth, provider);
    dispatch(setUser(payload.user));
    console.log(payload.user);
  };
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

async function uploadToDb(payload, downloadURL, dispatch) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      actor: {
        description: payload.user.email,
        title: payload.user.displayName,
        date: payload.timestamp,
        image: payload.user.photoURL,
      },
      video: payload.video,
      sharedImg: downloadURL,
      comments: 0,
      description: payload.description,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  dispatch(setLoading(false));
}
export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image != "") {
      const metadata = {
        contentType: "image/jpeg",
      };
      const upload = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(upload, payload.image, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => console.log(error, "fuck you"),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await uploadToDb(payload, downloadURL, dispatch);
          });
        }
      );
    } else if (payload.video) {
      uploadToDb(payload, "", dispatch);
    }
  };
}

export function getArticleAPI() {
  return async (dispatch) => {
    let payload = [];
    const querySnapshot = await getDocs(collection(db, "articles"));
    querySnapshot.forEach((doc) => {
      payload.push(doc.data());
    });
    dispatch(getArticles(payload));
  };
}
