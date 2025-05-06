import {ReviewHistoryItem} from "@/models/ReviewHistory";
import {Timestamp} from "@react-native-firebase/firestore";

export interface Card {
    id: string;
    deckId: string;
    question: string;
    answer: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nextReviewDate: Timestamp;
    reviewLevel: number;
    ease: number;
    reviewHistory: ReviewHistoryItem[];
}