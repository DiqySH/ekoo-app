import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { database } from "@/lib/databaseClient";
import type { Session, User } from "@supabase/supabase-js";
import type { AuthContextValue } from "@/@types/authContext";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = database.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = (email: string, password: string) =>
    database.auth.signInWithPassword({ email, password });

  const signUpWithEmail = (email: string, password: string) =>
    database.auth.signUp({ email, password });

  const signInWithGoogle = () =>
    database.auth.signInWithOAuth({ provider: "google" });

  const signOut = async () => {
    setLoading(true);
    await database.auth.signOut();
    setLoading(false);
  };

  const value: AuthContextValue = {
    user,
    session,
    loading,
    isAuthenticated: !!user,

    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };

  console.log(user);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
};
