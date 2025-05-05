import {Timestamp} from "@firebase/firestore";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
    lastLoginAt: Timestamp;
    settings: {
        reviewInterval: number;
        notifications: boolean;
        notificationTime?: string;
    }
}