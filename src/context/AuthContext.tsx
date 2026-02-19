"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { api, authTokenKey } from "@/lib/api";

export type AuthUser = {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    profilePhoto?: string;
    location?: string;
    isVerified: boolean;
};

type AuthContextValue = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ requiresVerification?: boolean; email?: string }>;
    register: (data: RegisterData) => Promise<{ email: string }>;
    logout: () => void;
    setUser: (user: AuthUser) => void;
};

type RegisterData = {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    dateOfBirth?: string;
    location?: string;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user on mount if token exists
    useEffect(() => {
        const loadUser = async () => {
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem(authTokenKey)
                    : null;
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const userData = await api.get<AuthUser>("/api/auth/me");
                setUser(userData);
            } catch {
                localStorage.removeItem(authTokenKey);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = useCallback(
        async (
            email: string,
            password: string
        ): Promise<{ requiresVerification?: boolean; email?: string }> => {
            const response = await api.post<{
                token?: string;
                user?: AuthUser;
                requiresVerification?: boolean;
                email?: string;
                message?: string;
            }>("/api/auth/login", { email, password });

            if (response.requiresVerification) {
                return {
                    requiresVerification: true,
                    email: response.email,
                };
            }

            if (response.token) {
                localStorage.setItem(authTokenKey, response.token);
                setUser(response.user || null);
            }

            return {};
        },
        []
    );

    const register = useCallback(
        async (data: RegisterData): Promise<{ email: string }> => {
            const response = await api.post<{ email: string; message: string }>(
                "/api/auth/register",
                data
            );
            return { email: response.email };
        },
        []
    );

    const logout = useCallback(() => {
        localStorage.removeItem(authTokenKey);
        setUser(null);
    }, []);

    const isAuthenticated = !!user;

    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            isLoading,
            login,
            register,
            logout,
            setUser,
        }),
        [user, isAuthenticated, isLoading, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
};
