import firebase from "firebase/app";
import "firebase/auth";
import { app } from "./core";

export async function signout() {
  try {
    await app.auth().signOut();
  } catch (error) {
    return error;
  }
  return null;
}

export async function signin(email, password) {
  try {
    await app.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
  return null;
}

export async function signinGmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  try {
    await app.auth().signInWithPopup(provider);
  } catch (error) {
    return error;
  }
  return null;
}
