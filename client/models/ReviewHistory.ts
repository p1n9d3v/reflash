import {Timestamp} from "@react-native-firebase/firestore";

export interface ReviewHistoryItem {
    date: Timestamp;
    response: number;
    timeSpentMs: number;
    previousLevel: number;
    newLevel: number;
}