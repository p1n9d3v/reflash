import { Timestamp } from "@react-native-firebase/firestore";

// 학습 일정 타입
export interface Schedule {
    id: string;
    userId: string;
    date: Timestamp;
    decks: ScheduleDeck[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface ScheduleDeck {
    deckId: string;
    deckName: string;
    category: string;
    color: string;
    completed: boolean;
    completedAt: Timestamp | null;
}

// 학습 통계 타입
export interface Achievement {
    id: string;
    userId: string;
    deckId: string;
    deckName: string;
    totalCards: number;
    studiedCards: number;
    correctAnswers: number;
    wrongAnswers: number;
    completionRate: number;
    averageAccuracy: number;
    studyCount: number;
    lastStudiedAt: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    wrongCards: WrongCard[];
}

export interface WrongCard {
    cardId: string;
    wrongCount: number;
    lastWrongAt: Timestamp;
}