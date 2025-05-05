export interface Deck {
    id: string;
    userId: string;
    name: string;
    description?: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    cardCount: number;
    lastReviewedAt?: Date;
}