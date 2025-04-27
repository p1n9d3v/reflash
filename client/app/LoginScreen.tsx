import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import {
    configureGoogleSignIn,
    signInWithGoogle,
    signInWithTestAccount,
    signOut,
    getCurrentUser,
    onAuthStateChanged
} from '@/apis/auth/googleAuth';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LoginScreen: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // 컴포넌트 마운트 시 Google 로그인 초기화 및 로그인 상태 모니터링
    useEffect(() => {
        // Google 로그인 초기화
        configureGoogleSignIn();

        // 로그인 상태 변경 리스너 설정
        const unsubscribe = onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        // 컴포넌트 언마운트 시 구독 해제
        return () => unsubscribe();
    }, []);

    // Google 로그인 처리
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { user, error } = await signInWithGoogle();

            if (error) {
                console.error('로그인 실패:', error);
                Alert.alert('로그인 실패', error.message);
            }
        } catch (error: any) {
            console.error('로그인 처리 중 오류 발생:', error);
            Alert.alert('오류', '로그인 처리 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 테스트 계정 로그인 처리
    const handleTestLogin = async () => {
        try {
            setLoading(true);
            const { user, error } = await signInWithTestAccount();

            if (error) {
                console.error('테스트 로그인 실패:', error);
                Alert.alert('로그인 실패', error.message);
            }
        } catch (error: any) {
            console.error('테스트 로그인 중 오류 발생:', error);
            Alert.alert('오류', '테스트 로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            setLoading(true);
            const { success, error } = await signOut();

            if (!success && error instanceof Error) {
                Alert.alert('로그아웃 실패', error.message);
            }
        } catch (error: any) {
            console.error('로그아웃 처리 중 오류 발생:', error);
            Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Rebrain</Text>
                <Text style={styles.subtitle}>효과적인 학습을 위한 복습 앱</Text>
            </View>

            <View style={styles.buttonContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4285F4" />
                ) : user ? (
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.welcomeText}>환영합니다!</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <MaterialIcons name="logout" size={20} color="white" />
                            <Text style={styles.buttonText}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* 네이티브 Google 로그인 버튼 사용 */}
                        <GoogleSigninButton
                            style={styles.googleButton}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={handleGoogleLogin}
                            disabled={loading}
                        />

                        {/* 커스텀 Google 로그인 버튼 (대체 UI) */}
                        <TouchableOpacity
                            style={[styles.button, styles.customGoogleButton]}
                            onPress={handleGoogleLogin}
                            disabled={loading}
                        >
                            <AntDesign name="google" size={24} color="white" />
                            <Text style={styles.buttonText}>Google로 계속하기</Text>
                        </TouchableOpacity>

                        {__DEV__ && (
                            <TouchableOpacity
                                style={[styles.button, styles.testButton]}
                                onPress={handleTestLogin}
                                disabled={loading}
                            >
                                <MaterialIcons name="bug-report" size={24} color="white" />
                                <Text style={styles.buttonText}>테스트 계정으로 로그인</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 16,
        borderRadius: 10,
        marginBottom: 15,
    },
    googleButton: {
        width: 240,
        height: 48,
        marginBottom: 16,
    },
    customGoogleButton: {
        backgroundColor: "#4285F4",
        display: "none", // 네이티브 버튼 사용시 숨김
    },
    testButton: {
        backgroundColor: "#FF5722",
    },
    logoutButton: {
        backgroundColor: "#EA4335",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
    },
    userInfoContainer: {
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    userEmail: {
        fontSize: 16,
        color: "#666",
    }
});

export default LoginScreen;