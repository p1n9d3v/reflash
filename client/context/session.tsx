import {
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
} from 'react';
import { User } from 'firebase/auth';
import { router } from 'expo-router';

const AuthContext = createContext<{
    user: User | null;
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
}>({
    user: null,
    signIn: () => null,
    signOut: () => null,
    session: null,
});

export function useSession() {
    const value = createContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!user) {
            router.replace('/sign-in');
        } else {
            router.replace('/(app)');
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    console.log('signIn');
                },
                signOut: () => {
                    console.log('signOut');
                },
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
