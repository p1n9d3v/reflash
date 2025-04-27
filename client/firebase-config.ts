import { getApp } from '@react-native-firebase/app';
import { getAuth, connectAuthEmulator } from '@react-native-firebase/auth';
import {
    getFirestore,
    connectFirestoreEmulator,
} from '@react-native-firebase/firestore';
import {
    getStorage,
    connectStorageEmulator,
} from '@react-native-firebase/storage';

const app = getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

if (__DEV__) {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Firebase 에뮬레이터에 연결되었습니다.');
}

export { auth, firestore, storage };
