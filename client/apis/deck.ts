import {Deck} from "@/models/deck";
import {firestore} from "@/firebase-config";
import {COLLECTIONS} from "@/firebase/collections";
import {Timestamp} from "@react-native-firebase/firestore";

export const getUserDecks = async (userId: string): Promise<Deck[]> => {
    try{
        const snapshot = await firestore
            .collection(COLLECTIONS.DECKS)
            .where('userId', '==', userId)
            .orderBy('updatedAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as Deck));
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const getDeck = async (deckId: string): Promise<Deck | null> => {
    try {
        const doc = await firestore
            .collection(COLLECTIONS.DECKS)
            .doc(deckId)
            .get();

        if (!doc.exists) return null;

        return {
            id: doc.id,
            ...doc.data(),
        } as Deck;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createDeck = async (userId: string, data: Partial<Deck>): Promise<Deck> => {
    try {
        const now = Timestamp.now();
        const newDeck = {
            userId,
            name: data.name || '새 덱',
            description: data.description || '',
            category: data.category || '기타',
            createdAt: now,
            updatedAt: now,
            cardCount: 0,
        };

        const docRef = await firestore.collection(COLLECTIONS.DECKS).add(newDeck);
        return { id: docRef.id, ...newDeck } as Deck;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateDeck = async (deckId: string, data: Partial<Deck>): Promise<void> => {
    try {
        const updateData = {
            ...data,
            updatedAt: new Date(),
        };

        await firestore.collection(COLLECTIONS.DECKS).doc(deckId).update(updateData);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteDeck = async (deckId: string): Promise<void> => {
    try {
        await firestore.runTransaction(async transaction => {
            const cardsSnapshot = await firestore
                .collection(COLLECTIONS.CARDS)
                .where('deckId', '==', deckId)
                .get();

            cardsSnapshot.docs.forEach(doc => {
                transaction.delete(doc.ref);
            });

            transaction.delete(firestore.collection(COLLECTIONS.DECKS).doc(deckId));
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
