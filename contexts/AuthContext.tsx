'use client';

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { createAuthClient } from '@/utils/supabase/client';

type User = {
    email: string;
    authenticated: boolean;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    setUser: Dispatch<SetStateAction<User | null>>
    getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
      const supabase = createAuthClient();

      const fetchUser = async () => {
          const { data } = await supabase.auth.getUser();
          if (data.user && data.user.email) {
              setUser({ email: data.user.email, authenticated: data.user.aud === "authenticated" });
          }
          setLoading(false);
      };

      fetchUser();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            setUser({ email: session.user.email || '', authenticated: session.user.aud === "authenticated" });
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }, []);

    const logout = async () => {
        const supabase = createAuthClient();
        await supabase.auth.signOut();
        setUser(null);
        router.push('/');
    };

    const getToken = async () => {
        const supabase = createAuthClient();
        const { data } = await supabase.auth.getSession();
        return data.session?.access_token || null;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
