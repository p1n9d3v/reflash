import { auth } from '@/firebase-config';
import {
    CallbackOrObserver,
    FirebaseAuthTypes,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_CLIENT_ID, // 웹 클라이언트 ID
    offlineAccess: true,
});

export const signInWithGoogle = async () => {
    try {
        console.log('Google Sign-In 시작...');

        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        console.log('Play Services 확인 완료');

        const userInfo = await GoogleSignin.signIn();
        console.log('사용자 정보:', userInfo);

        if (!userInfo.data?.idToken) {
            throw new Error('Google에서 ID 토큰을 받지 못했습니다.');
        }

        const googleCredential = GoogleAuthProvider.credential(
            userInfo.data.idToken,
        );

        const userCredential = await signInWithCredential(
            auth,
            googleCredential,
        );
        console.log('Firebase 인증 성공');

        return userCredential;
    } catch (error) {
        console.error('Google Sign-In 에러:', error);
        throw error;
    }
};

export const onAuthChanged = (
    callback: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>,
) => {
    onAuthStateChanged(auth, callback);
};
