import { storage } from '../firebase/firebase';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

// 타입 정의
export interface User {
    id: string;
    displayName: string;
    email: string;
    photoURL?: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    lastLogin: FirebaseFirestoreTypes.Timestamp;
}

// 사용자 관련 서비스
export const userService = {
    // 현재 사용자의 정보 가져오기
    getCurrentUser: async (): Promise<User | null> => {
        const currentUser = auth().currentUser;
        if (!currentUser) return null;

        try {
            const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
            if (userDoc.exists) {
                return { id: userDoc.id, ...userDoc.data() } as User;
            }
            return null;
        } catch (error) {
            console.error('사용자 정보 불러오기 실패:', error);
            return null;
        }
    },

    // 사용자 프로필 업데이트
    updateUserProfile: async (userId: string, data: Partial<User>): Promise<boolean> => {
        try {
            await firestore().collection('users').doc(userId).update({
                ...data,
                updatedAt: firestore.FieldValue.serverTimestamp(),
            });
            return true;
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            return false;
        }
    },

    // 로그인 시 사용자 생성 또는 업데이트
    createOrUpdateUser: async (user: FirebaseAuthTypes.User): Promise<void> => {
        const userRef = firestore().collection('users').doc(user.uid);

        try {
            const userDoc = await userRef.get();

            if (userDoc.exists) {
                // 기존 사용자 업데이트
                await userRef.update({
                    lastLogin: firestore.FieldValue.serverTimestamp(),
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                });
            } else {
                // 새 사용자 생성
                await userRef.set({
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    lastLogin: firestore.FieldValue.serverTimestamp(),
                });
            }
        } catch (error) {
            console.error('사용자 생성/업데이트 실패:', error);
            Alert.alert('오류', '사용자 정보를 저장하는 중 문제가 발생했습니다.');
        }
    },
};

export default {
    userService,
};