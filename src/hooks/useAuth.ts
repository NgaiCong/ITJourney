// hooks/useAuth.ts
"use client";
import { useState, useEffect } from "react";
import { onAuthStateChange, signInWithGoogle, signOutUser, getUserProfile, type User } from "@/lib/firebase";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  progress?: {
    currentPhase: number;
    completedPhases: string[];
    startedAt?: Date;
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user profile from Firestore
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile as UserProfile);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    setError(null);
    setLoading(true);
    
    const result = await signInWithGoogle();
    
    if (!result.success) {
      setError("Failed to sign in. Please try again.");
    }
    
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setError(null);
    const result = await signOutUser();
    
    if (!result.success) {
      setError("Failed to sign out. Please try again.");
    }
    
    return result;
  };

  return {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
}
