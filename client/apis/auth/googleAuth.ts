import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {auth} from '../../firebase/firebase';
import {GoogleAuthProvider} from '@react-native-firebase/auth';
import {
    GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID
} from '@env';

// Google 로그인 초기화 (앱 시작 시 한 번만 호출)
export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID, // 웹 클라이언트 ID
        iosClientId: GOOGLE_IOS_CLIENT_ID, // iOS 클라이언트 ID
        offlineAccess: false, // 오프라인 액세스가 필요하지 않음
        scopes: ['profile', 'email'] // 기본 스코프
    });
};

// Google 로그인
export const signInWithGoogle = async () => {
    try {
        // Google Play 서비스 확인 (Android 전용)
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

        // Google 로그인 수행
        const userInfo = await GoogleSignin.signIn();
        console.log('Google 로그인 성공:', userInfo);

        // ID 토큰 확인
        if (!userInfo.data?.idToken) {
            throw new Error('Google에서 ID 토큰을 받지 못했습니다.');
        }

        // Firebase 인증에 사용할 Google 크레덴셜 생성
        const googleCredential = GoogleAuthProvider.credential(userInfo.data.idToken);

        // Firebase로 로그인
        const userCredential = await auth.signInWithCredential(googleCredential);
        console.log('Firebase 로그인 성공:', userCredential.user.uid);

        return {user: userCredential.user, error: null};
    } catch (error: any) {
        console.error('Google 로그인 에러:', error);

        // 에러 코드에 따른 처리
        if (error.code) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    return {user: null, error: new Error('로그인이 취소되었습니다.')};
                case statusCodes.IN_PROGRESS:
                    return {user: null, error: new Error('로그인이 이미 진행 중입니다.')};
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    return {user: null, error: new Error('Google Play 서비스를 사용할 수 없습니다.')};
                default:
                    return {user: null, error: new Error(`Google 로그인 오류: ${error.message}`)};
            }
        }

        return {user: null, error};
    }
};

// 테스트 계정 로그인 (개발 환경용)
export const signInWithTestAccount = async () => {
    try {
        console.log("테스트 계정으로 로그인 시도...");
        const testEmail = "test@example.com";
        const testPassword = "password";

        try {
            // 기존 테스트 계정으로 로그인 시도
            await auth.signInWithEmailAndPassword(testEmail, testPassword);
            console.log("테스트 계정 로그인 성공");
            return {user: auth.currentUser, error: null};
        } catch (loginError) {
            console.log("테스트 계정이 없어 새로 생성합니다", loginError);
            // 계정이 없으면 새로 생성
            const userCredential = await auth.createUserWithEmailAndPassword(
                testEmail,
                testPassword
            );
            console.log("테스트 계정 생성 및 로그인 성공");
            return {user: userCredential.user, error: null};
        }
    } catch (error) {
        console.error("테스트 로그인 에러:", error);
        return {
            user: null,
            error: new Error("Firebase 에뮬레이터에 연결되어 있는지 확인하세요.")
        };
    }
};

// 자동 로그인 시도 (이전 로그인 정보 사용)
export const signInSilently = async () => {
    try {
        // 이전에 로그인한 사용자가 있는지 확인
        const isSignedIn = GoogleSignin.getCurrentUser();

        if (!isSignedIn) {
            return {user: null, error: null};
        }

        // 자동 로그인 시도
        const userInfo = await GoogleSignin.signInSilently();
        console.log('자동 로그인 성공:', userInfo);

        // ID 토큰으로 Firebase 로그인
        if (userInfo.data?.idToken) {
            const googleCredential = GoogleAuthProvider.credential(userInfo.data.idToken);
            const userCredential = await auth.signInWithCredential(googleCredential);
            return {user: userCredential.user, error: null};
        } else {
            // ID 토큰이 없는 경우 Firebase 로그인 불가능
            return {user: null, error: new Error('ID 토큰이 없습니다.')};
        }
    } catch (error: any) {
        console.error('자동 로그인 에러:', error);

        // 특정 에러 코드에 대한 처리
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // 사용자가 직접 로그인해야 함
            return {user: null, error: null};
        }

        return {user: null, error};
    }
};

// 로그아웃
export const signOut = async () => {
    try {
        // Google 로그인 로그아웃
        await GoogleSignin.signOut();

        // Firebase 로그아웃
        await auth.signOut();
        console.log('로그아웃 성공');

        return {success: true, error: null};
    } catch (error) {
        console.error('로그아웃 에러:', error);
        return {success: false, error};
    }
};

// 현재 로그인 상태 확인
export const getCurrentUser = () => {
    return auth.currentUser;
};

// 로그인 상태 변경 리스너
export const onAuthStateChanged = (callback: (user: any) => void) => {
    return auth.onAuthStateChanged(callback);
};

// Google 연결 해제 (선택 사항)
export const revokeAccess = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await auth.signOut();
        console.log('Google 연결 해제 및 로그아웃 성공');
        return {success: true, error: null};
    } catch (error) {
        console.error('Google 연결 해제 에러:', error);
        return {success: false, error};
    }
};