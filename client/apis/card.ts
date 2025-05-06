import {firestore} from "@/firebase-config";
import {Card} from "@/models/card";
import {COLLECTIONS} from "@/firebase/collections";
import {Timestamp} from "@react-native-firebase/firestore";

export const getDeckCards = async (deckId: string): Promise<Card[]> => {
    try {
        const snapshot = await firestore
            .collection(COLLECTIONS.CARDS)
            .where('deckId', '==', deckId)
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as Card));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCard = async (cardId: string): Promise<Card | null> => {
    try {
        const doc = await firestore
            .collection(COLLECTIONS.CARDS)
            .doc(cardId)
            .get();

        if (!doc.exists) return null;

        return {
            id: doc.id,
            ...doc.data(),
        } as Card;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createCard = async (
    deckId: string,
    data: { question: string; answer: string }
): Promise<Card> => {
    try {
        const today = Timestamp.now();

        const newCard = {
            deckId,
            question: data.question,
            answer: data.answer,
            createdAt: today,
            updatedAt: today,
            nextReviewDate: today,
            reviewLevel: 1,
            ease: 250,
            reviewHistory: [],
        };

        const cardId = await firestore.runTransaction(async transaction => {
            const cardRef = firestore.collection(COLLECTIONS.CARDS).doc();
            transaction.set(cardRef, newCard);

            const deckRef = firestore.collection(COLLECTIONS.DECKS).doc(deckId);
            const deckDoc = await transaction.get(deckRef);

            if (!deckDoc.exists) {
                throw new Error;
            }

            const deckData = deckDoc.data() || {};
            transaction.update(deckRef, {
                cardCount: (deckData.cardCount || 0) + 1,
                updatedAt: today,
            });

            return cardRef.id;
        });

        return { id: cardId, ...newCard } as Card;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateCard = async (cardId: string, data: Partial<Card>): Promise<void> => {
    try {
        const updateData = {
            ...data,
            updatedAt: new Date(),
        };

        await firestore.collection(COLLECTIONS.CARDS).doc(cardId).update(updateData);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteCard = async (cardId: string, deckId: string): Promise<void> => {
    try {
        await firestore.runTransaction(async transaction => {
            const cardRef = firestore.collection(COLLECTIONS.CARDS).doc(cardId);
            transaction.delete(cardRef);

            const deckRef = firestore.collection(COLLECTIONS.DECKS).doc(deckId);
            const deckDoc = await transaction.get(deckRef);

            if (!deckDoc.exists) {
                throw new Error;
            }

            const deckData = deckDoc.data() || {};
            transaction.update(deckRef, {
                cardCount: Math.max((deckData.cardCount || 0) - 1, 0),
                updatedAt: new Date(),
            });
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};