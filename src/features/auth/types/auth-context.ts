import type {
  User,
  Session,
  AuthTokenResponsePassword,
  AuthResponse,
  OAuthResponse,
} from "@supabase/supabase-js";

export type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;

  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  signUpWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<OAuthResponse>;
  signOut: () => Promise<void>;
};
