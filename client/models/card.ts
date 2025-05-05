import {ReviewHistory} from "@/models/ReviewHistory";

export interface Card {
    id: string;
    deckId: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
    nextReviewDate: Date;
    reviewLevel: number;
    ease: number;
    reviewHistory: ReviewHistory[];
}