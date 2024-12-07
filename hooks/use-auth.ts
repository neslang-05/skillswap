import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if token exists in cookies
    const hasToken = document.cookie.includes('token=');
    setIsAuthenticated(hasToken);
  }, []);

  const signOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to sign out');
      }

      setIsAuthenticated(false);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      router.push('/');
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    isAuthenticated,
    signOut,
  };
} 