import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type Auth,
  type User
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const FIREBASE_CONFIG_STORAGE_KEY = 'cess_firebase_config_v1';

export const getStoredFirebaseConfig = (): FirebaseConfig | null => {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
};

export const saveStoredFirebaseConfig = (config: FirebaseConfig) => {
  localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
};

export const clearStoredFirebaseConfig = () => {
  localStorage.removeItem(FIREBASE_CONFIG_STORAGE_KEY);
};

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

export const initFirebase = (config?: FirebaseConfig) => {
  const targetConfig = config || getStoredFirebaseConfig();
  if (!targetConfig || !targetConfig.apiKey || !targetConfig.projectId) {
    return { app: null, auth: null, db: null, isConfigured: false };
  }

  try {
    if (!getApps().length) {
      appInstance = initializeApp(targetConfig);
    } else {
      appInstance = getApp();
    }
    authInstance = getAuth(appInstance);
    firestoreInstance = getFirestore(appInstance);
    return {
      app: appInstance,
      auth: authInstance,
      db: firestoreInstance,
      isConfigured: true
    };
  } catch (err) {
    console.warn('Firebase initialization error:', err);
    return { app: null, auth: null, db: null, isConfigured: false, error: err };
  }
};

// Auto-run once
const initialInit = initFirebase();
export const firebaseApp = initialInit.app;
export const firebaseAuth = initialInit.auth;
export const firebaseDb = initialInit.db;

export const isFirebaseConfigured = (): boolean => {
  return !!getStoredFirebaseConfig()?.apiKey;
};

export const firebaseLogin = async (email: string, pass: string): Promise<User | null> => {
  if (!authInstance) {
    initFirebase();
  }
  if (!authInstance) {
    throw new Error('Firebase Auth is not initialized. Please configure Firebase credentials or use local admin credentials.');
  }
  const credential = await signInWithEmailAndPassword(authInstance, email, pass);
  return credential.user;
};

export const firebaseSignOut = async (): Promise<void> => {
  if (authInstance) {
    await signOut(authInstance);
  }
};

export const firebasePasswordReset = async (email: string): Promise<void> => {
  if (!authInstance) {
    initFirebase();
  }
  if (!authInstance) {
    throw new Error('Firebase Auth is not configured. Local password reset link generated.');
  }
  await sendPasswordResetEmail(authInstance, email);
};

export const subscribeToFirebaseUser = (callback: (user: User | null) => void) => {
  if (!authInstance) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(authInstance, callback);
};
