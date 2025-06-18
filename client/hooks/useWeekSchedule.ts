import { useQuery } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";
import { Timestamp } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const useWeekSchedule = (startDate: Date, endDate: Date) => {
    const userId = auth().currentUser?.uid;
    return useQuery({
        queryKey: [
            "weekSchedule",
            userId,
            startDate.toISOString(),
            endDate.toISOString(),
        ],
        queryFn: async () => {
            if (!userId) throw new Error("로그인된 사용자가 없습니다.");
            const snapshot = await firestore()
                .collection("schedules")
                .where("userId", "==", userId)
                .where("date", ">=", Timestamp.fromDate(startDate))
                .where("date", "<=", Timestamp.fromDate(endDate))
                .orderBy("date", "asc")
                .get();

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        },
        enabled: !!userId,
    });
};
