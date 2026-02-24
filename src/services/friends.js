// src/services/friends.js
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const friendsCol = collection(db, "friends");

export async function fetchFriends() {
  const snap = await getDocs(friendsCol);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addFriend(data) {
  return await addDoc(friendsCol, {
    ...data,
    createdAt: Date.now(),
  });
}
