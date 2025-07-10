import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { CardImage, ShapeData, TextState } from "../Shared/types";

export interface TemplateData {
  shapes: ShapeData[];
  images: Omit<CardImage, "imageElement">[];
  text: TextState[];
  background: {
    color: string;
    imageUrl?: string;
  };
  createdAt?: string;
  frameSize?: {
    width: number;
    height: number;
  };
  thumbnail?: string | null;
}
const firebaseConfig = {
  apiKey: "AIzaSyDTb8Bnf2EygfB3haBdHInxkD5BAzduWHI",
  authDomain: "cardmaker-534d2.firebaseapp.com",
  projectId: "cardmaker-534d2",
  storageBucket: "cardmaker-534d2.firebasestorage.app",
  messagingSenderId: "645157612887",
  appId: "1:645157612887:web:1cc4446c6efe6d8a452212",
  measurementId: "G-FYQ8BS3N7G",
};
// Initialize Firebase only once
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export const saveTemplate = async (name: string, data: TemplateData) => {
  const cleanName = name.replace(/[^a-z0-9]/gi, "_");
  try {
    const templateRef = doc(db, "templates", cleanName);
    await setDoc(templateRef, {
      ...data,
      createdAt: new Date(),
    });
    return cleanName;
  } catch (error) {
    console.error("Error saving template:", error);
    throw error;
  }
};

export const listTemplates = async () => {
  try {
    const templatesRef = collection(db, "templates");
    const snapshot = await getDocs(templatesRef);
    return snapshot.docs.map((doc) => ({
      name: doc.id,
      data: doc.data() as TemplateData,
    }));
  } catch (error) {
    console.error("Error listing templates:", error);
    throw error;
  }
};

export const getTemplate = async (templateName: string) => {
  try {
    const templateRef = doc(db, "templates", templateName);
    const docSnap = await getDoc(templateRef);

    if (docSnap.exists()) {
      return docSnap.data() as TemplateData;
    }
    throw new Error("Template not found");
  } catch (error) {
    console.error("Error getting template:", error);
    throw error;
  }
};
const storage = getStorage(app);
export { app, db, storage };
