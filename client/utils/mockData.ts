import auth from "@react-native-firebase/auth";
import { collection, Timestamp } from "@react-native-firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const mockData = async (user?: FirebaseAuthTypes.User | null) => {
    console.log("mockData 함수 시작, user:", user?.uid);
    try {
        const currentUser = user || auth.currentUser;
        if (!currentUser) {
            console.error("로그인된 유저가 없습니다");
            return;
        }

        console.log("목데이터 생성 시작, userId:", currentUser.uid);
        const userId = currentUser.uid;
        const db = firestore();

        // 덱 데이터
        const decks = [
            {
                id: "deck1",
                userId: userId,
                name: "TOEIC 필수 단어 800",
                description: "토익 시험 대비 필수 영단어 모음",
                category: "영어",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                cardCount: 800,
            },
            {
                id: "deck2",
                userId: userId,
                name: "Daily English Conversation",
                description: "일상 영어 회화 표현 모음",
                category: "영어",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                cardCount: 450,
            },
            {
                id: "deck3",
                userId: userId,
                name: "JLPT N5 기초 단어",
                description: "일본어 능력시험 N5 필수 단어",
                category: "일본어",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                cardCount: 200,
            },
        ];

        // 덱 저장
        for (const deck of decks) {
            await db.collection("decks").doc(deck.id).set(deck);
        }

        // 카드 데이터
        const cards = [
            {
                id: "card1",
                deckId: "deck1",
                question: "Accomplish",
                answer: "성취하다, 달성하다",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                nextReviewDate: Timestamp.now(),
                reviewLevel: 0,
                ease: 2.5,
                reviewHistory: [],
            },
            {
                id: "card2",
                deckId: "deck1",
                question: "Contribute",
                answer: "기여하다, 공헌하다",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                nextReviewDate: Timestamp.now(),
                reviewLevel: 1,
                ease: 2.5,
                reviewHistory: [],
            },
            {
                id: "card3",
                deckId: "deck3",
                question: "こんにちは",
                answer: "안녕하세요",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                nextReviewDate: Timestamp.now(),
                reviewLevel: 2,
                ease: 2.5,
                reviewHistory: [],
            },
        ];

        // 카드 저장
        for (const card of cards) {
            await db.collection("cards").doc(card.id).set(card);
        }

        // 오늘 학습 일정
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const schedules = [];
        for (let i = 0; i < 7; i++) {
            const scheduleDate = new Date();
            scheduleDate.setDate(scheduleDate.getDate() + i);
            scheduleDate.setHours(0, 0, 0, 0);

            // 날짜별로 다른 덱 할당
            const dayDecks =
                i % 2 === 0
                    ? [
                          {
                              deckId: "deck1",
                              deckName: "TOEIC 필수 단어 800",
                              category: "영어",
                              color: "#8484FF",
                              completed: false,
                              completedAt: null,
                          },
                          {
                              deckId: "deck3",
                              deckName: "JLPT N5 기초 단어",
                              category: "일본어",
                              color: "#F6A9FD",
                              completed: false,
                              completedAt: null,
                          },
                      ]
                    : [
                          {
                              deckId: "deck2",
                              deckName: "Daily English Conversation",
                              category: "영어",
                              color: "#B9A6FF",
                              completed: false,
                              completedAt: null,
                          },
                      ];

            const schedule = {
                id: `schedule_${userId}_${scheduleDate.toISOString().split("T")[0]}`,
                userId: userId,
                date: Timestamp.fromDate(scheduleDate),
                decks: dayDecks,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };

            schedules.push(schedule);
        }

        for (const schedule of schedules) {
            await db.collection("schedules").doc(schedule.id).set(schedule);
        }

        // 학습 통계
        const achievements = [
            {
                id: `achievement_${userId}_deck1`,
                userId: userId,
                deckId: "deck1",
                deckName: "TOEIC 필수 단어 800",
                totalCards: 800,
                studiedCards: 320,
                correctAnswers: 256,
                wrongAnswers: 64,
                completionRate: 0.4,
                averageAccuracy: 0.8,
                studyCount: 6,
                lastStudiedAt: Timestamp.now(),
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                wrongCards: [
                    {
                        cardId: "card1",
                        wrongCount: 3,
                        lastWrongAt: Timestamp.now(),
                    },
                ],
            },
        ];

        for (const achievement of achievements) {
            await db
                .collection("achievements")
                .doc(achievement.id)
                .set(achievement);
        }

        console.log("목데이터 생성 완료");
    } catch (error) {
        console.error("목데이터 생성 중 오류:", error);
    }
};
