import { useState, useEffect } from 'react';
import { StorageService, UserProfile } from '@/lib/storage';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check storage for existing session on mount
    const checkAuth = () => {
      const currentUser = StorageService.getUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();

    // Listen for storage events (optional, for multi-tab support)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = StorageService.login(username, password);
    if (result.success) {
      setUser(StorageService.getUser());
    }
    setLoading(false);
    return result;
  };

  const register = async (username: string, password: string, displayName: string, avatarUrl: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = StorageService.register(username, password, displayName, avatarUrl);
    if (result.success) {
      setUser(StorageService.getUser());
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    StorageService.logout();
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    // Data Portability
    exportData: () => StorageService.exportUserData(),
    importData: (json: string) => StorageService.importUserData(json)
  };
}
