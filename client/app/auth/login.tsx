import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { auth } from "../../firebase/firebase";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { GoogleAuthProvider, AppleAuthProvider } from "@react-native-firebase/auth";

// 웹 브라우저 결과 등록
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [directLoginMode, setDirectLoginMode] = useState(false);
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");

  // 구글 인증 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    // google-services.json에서 가져온 웹 클라이언트 ID
    webClientId: "123935749466-0pos7sor5ufgmo0h9f9u32nl9mlk03ui.apps.googleusercontent.com",
    androidClientId: "123935749466-g5i53qj3copv6dk0p4o7t6r4hqo9m8a2.apps.googleusercontent.com",
    // iOS 클라이언트 ID (GoogleService-Info.plist에서 가져옴)
    iosClientId: Platform.OS === 'ios' ? "123935749466-be4k50efmaeeme69q0o10tmpi5s1cs9l.apps.googleusercontent.com" : undefined,
  });

  // Apple 인증 사용 가능 여부 확인
  useEffect(() => {
    const checkAppleAuthAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };

    checkAppleAuthAvailable();
  }, []);

  // Google 인증 응답 처리
  useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      // 에뮬레이터 환경에서는 간단히 테스트 계정으로 로그인
      if (__DEV__) {
        simulateLogin();
      } else {
        // 실제 앱에서는 Google ID 토큰으로 Firebase 로그인
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        auth.signInWithCredential(credential)
            .then(() => {
              router.replace("/");
            })
            .catch(error => {
              Alert.alert("로그인 실패", error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
            })
            .finally(() => {
              setLoading(false);
            });
      }
    }
  }, [response]);

  // 에뮬레이터 환경에서 로그인 시뮬레이션
  const simulateLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword("test@example.com", "password");
      router.replace("/");
    } catch (error) {
      // 에뮬레이터에 사용자가 없으면 생성
      try {
        await auth.createUserWithEmailAndPassword(
            "test@example.com",
            "password",
        );
        router.replace("/");
      } catch (createError) {
        Alert.alert(
            "로그인 실패",
            "Firebase 에뮬레이터에 연결되어 있는지 확인하세요.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Apple 로그인 처리
  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      if (__DEV__) {
        // 개발 환경에서는 테스트 계정으로 로그인
        simulateLogin();
      } else {
        // 실제 환경에서는 Apple 로그인 사용
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        // Firebase에 Apple 로그인 정보로 인증
        const provider = AppleAuthProvider;
        const authCredential = provider.credential(credential.identityToken || '');

        await auth.signInWithCredential(authCredential);
        router.replace('/');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'ERR_CANCELED') {
        Alert.alert("로그인 실패", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 직접 로그인 처리 (개발 환경 전용)
  const handleDirectLogin = async () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      router.replace("/");
    } catch (error) {
      try {
        // 사용자가 없을 경우 새로 생성
        await auth.createUserWithEmailAndPassword(email, password);
        router.replace("/");
      } catch (createError) {
        Alert.alert(
            "로그인 실패",
            "잘못된 이메일/비밀번호이거나 Firebase 에뮬레이터에 연결되어 있지 않습니다."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // 개발 모드 토글 (길게 누를 때)
  const toggleDevMode = () => {
    setDirectLoginMode(!directLoginMode);
  };

  return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title} onLongPress={toggleDevMode}>Rebrain</Text>
          <Text style={styles.subtitle}>효과적인 학습을 위한 복습 앱</Text>
        </View>

        <View style={styles.buttonContainer}>
          {directLoginMode && __DEV__ ? (
              // 개발 모드에서만 직접 로그인 버튼 표시
              <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#34A853" }]}
                  onPress={handleDirectLogin}
                  disabled={loading}
              >
                <MaterialIcons name="developer-mode" size={24} color="white" />
                <Text style={styles.buttonText}>개발자 모드 로그인</Text>
              </TouchableOpacity>
          ) : (
              // 일반 로그인 버튼들
              <>
                <TouchableOpacity
                    style={[styles.button, styles.googleButton]}
                    onPress={() => promptAsync()}
                    disabled={loading}
                >
                  <AntDesign name="google" size={24} color="white" />
                  <Text style={styles.buttonText}>Google로 계속하기</Text>
                </TouchableOpacity>

                {appleAuthAvailable && (
                    <TouchableOpacity
                        style={[styles.button, styles.appleButton]}
                        onPress={handleAppleLogin}
                        disabled={loading}
                    >
                      <AntDesign name="apple1" size={24} color="white" />
                      <Text style={styles.buttonText}>Apple로 계속하기</Text>
                    </TouchableOpacity>
                )}

                {__DEV__ && (
                    <TouchableOpacity
                        style={[styles.button, styles.testButton]}
                        onPress={simulateLogin}
                        disabled={loading}
                    >
                      <MaterialIcons name="bug-report" size={24} color="white" />
                      <Text style={styles.buttonText}>테스트 계정으로 로그인</Text>
                    </TouchableOpacity>
                )}
              </>
          )}

          {loading && (
              <BlurView intensity={70} style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4285F4" />
              </BlurView>
          )}
        </View>
      </View>
  );
}

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
    backgroundColor: "#4285F4",
  },
  appleButton: {
    backgroundColor: "#000",
  },
  testButton: {
    backgroundColor: "#FF5722",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});