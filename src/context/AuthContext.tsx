import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
};

type Credentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (creds: Credentials) => Promise<void>;
  signup: (data: User & {password: string}) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = '@users';
const CURRENT_USER_KEY = '@current_user';


const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const raw = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const signup = useCallback(async (data: User & {password: string}) => {
    const {name, email, password} = data;
    if (!name || !email || !password) {
      throw new Error('Please fill all fields.');
    }
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: Array<User & {password: string}> = usersRaw ? JSON.parse(usersRaw) : [];

    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('User already exists.');
    }
    const newUser = {name, email, password};
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    const publicUser = {name: newUser.name, email: newUser.email};
    setUser(publicUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
  }, []);

  const login = useCallback(async ({email, password}: Credentials) => {
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (!password) {
      throw new Error('Password is required.');
    }
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: Array<User & {password: string}> = usersRaw ? JSON.parse(usersRaw) : [];
    const match = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!match) {
      throw new Error('Incorrect credentials.');
    }
    const publicUser = {name: match.name, email: match.email};
    setUser(publicUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  }, []);

  const value = useMemo(
    () => ({user, loading, login, signup, logout}),
    [user, loading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
