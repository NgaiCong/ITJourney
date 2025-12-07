// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, serverTimestamp, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, connectAuthEmulator, type User } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByjuLKQLoEHDYNAyzkfkBvyHxh1E2XT5M",
  authDomain: "itroadmap-d6bc1.firebaseapp.com",
  projectId: "itroadmap-d6bc1",
  storageBucket: "itroadmap-d6bc1.firebasestorage.app",
  messagingSenderId: "534015084164",
  appId: "1:534015084164:web:010f37f7e9cf71485ea4d1"
};

// Initialize Firebase (prevent re-initialization in hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Connect to Emulators in Development
// Run: firebase emulators:start
// Set .env.local: NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  // Note: Use 127.0.0.1 instead of localhost to avoid CORS/Network issues on some machines
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
  console.log("🔥 Connected to Firebase Emulators");
}

// Auth providers
const googleProvider = new GoogleAuthProvider();

// ========================================
// Authentication Functions
// ========================================

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create or update user profile in Firestore
    await createUserProfile(user);
    
    return { success: true, user };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { success: false, error };
  }
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error };
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ========================================
// User Profile Functions
// ========================================

/**
 * Create or update user profile in Firestore
 */
export async function createUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    // Create new user profile
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      progress: {
        currentPhase: 1,
        completedPhases: [],
        startedAt: serverTimestamp(),
      }
    });
  } else {
    // Update last login
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
    });
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
}

// ========================================
// Progress Tracking Functions
// ========================================

export interface PhaseProgress {
  phaseId: string;
  status: "not-started" | "in-progress" | "completed";
  startedAt?: Date;
  completedAt?: Date;
  resourcesCompleted: string[];
  challengeCompleted: boolean;
  notes: string;
}

/**
 * Update user's current phase
 */
export async function updateCurrentPhase(uid: string, phaseNumber: number) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    "progress.currentPhase": phaseNumber,
  });
}

/**
 * Mark a phase as completed
 */
export async function completePhase(uid: string, phaseId: string) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const userData = userSnap.data();
    const completedPhases = userData.progress?.completedPhases || [];
    
    if (!completedPhases.includes(phaseId)) {
      await updateDoc(userRef, {
        "progress.completedPhases": [...completedPhases, phaseId],
      });
    }
  }
}

/**
 * Update phase progress details
 */
export async function updatePhaseProgress(uid: string, phaseId: string, progress: Partial<PhaseProgress>) {
  const progressRef = doc(db, "users", uid, "phaseProgress", phaseId);
  await setDoc(progressRef, {
    ...progress,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/**
 * Get phase progress for a user
 */
export async function getPhaseProgress(uid: string, phaseId: string): Promise<PhaseProgress | null> {
  const progressRef = doc(db, "users", uid, "phaseProgress", phaseId);
  const progressSnap = await getDoc(progressRef);
  
  if (progressSnap.exists()) {
    return progressSnap.data() as PhaseProgress;
  }
  return null;
}

/**
 * Mark a resource as completed
 */
export async function markResourceCompleted(uid: string, phaseId: string, resourceName: string) {
  const progressRef = doc(db, "users", uid, "phaseProgress", phaseId);
  const progressSnap = await getDoc(progressRef);
  
  if (progressSnap.exists()) {
    const data = progressSnap.data();
    const completed = data.resourcesCompleted || [];
    
    if (!completed.includes(resourceName)) {
      await updateDoc(progressRef, {
        resourcesCompleted: [...completed, resourceName],
        updatedAt: serverTimestamp(),
      });
    }
  } else {
    // Create new progress document
    await setDoc(progressRef, {
      phaseId,
      status: "in-progress",
      startedAt: serverTimestamp(),
      resourcesCompleted: [resourceName],
      challengeCompleted: false,
      notes: "",
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * Mark phase challenge as completed
 */
export async function markChallengeCompleted(uid: string, phaseId: string) {
  const progressRef = doc(db, "users", uid, "phaseProgress", phaseId);
  await setDoc(progressRef, {
    challengeCompleted: true,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// ========================================
// Firestore Collections Reference
// ========================================

export const collections = {
  users: collection(db, "users"),
  // Add more collections as needed
};

// Export types
export type { User };