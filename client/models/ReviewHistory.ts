export interface ReviewHistory {
    id: string;
    cardId: string;
    reviewDate: Date;
    response: 'easy' | 'good' | 'hard' | 'again';
    timeSpent: number;
}