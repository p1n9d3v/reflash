import {Timestamp} from "@react-native-firebase/firestore";

export interface Deck {
    id: string;
    userId: string;
    name: string;
    description: string;
    category: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    cardCount: number;
}