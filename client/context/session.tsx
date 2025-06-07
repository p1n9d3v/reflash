import { onAuthChanged, signInWithGoogle, signOut } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { Alert } from "react-native";
import { User } from "firebase/auth";
const AuthContext = createContext<{
    user: User | null;
    signInWithGoogle: () => void;
    signOut: () => void;
}>({
    user: null,
    signInWithGoogle: () => null,
    signOut: () => null,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useSession must be wrapped in a <SessionProvider />");
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    const signInWithGoogleMutation = useMutation({
        mutationFn: signInWithGoogle,
        onError: (error) => {
            Alert.alert("에러", error.message);
        },
    });

    const signOutMutation = useMutation({
        mutationFn: signOut,
        onError: (error) => {
            Alert.alert("에러", error.message);
        },
    });

    useEffect(() => {
        router.replace("/(app)/home");
        // if (!user) {
        //     router.replace("/sign-in");
        // } else {
        //     router.replace("/(app)/home");
        // }
    }, [user]);

    useEffect(() => {
        onAuthChanged((user) => {
            setUser(user as User | null);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signInWithGoogle: signInWithGoogleMutation.mutate,
                signOut: signOutMutation.mutate,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
