import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ChartLine, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";

import { colors } from "@/components/ui/gluestack-ui-provider/config";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const convertDayToKor = (day: number) => {
    const korDays = ["일", "월", "화", "수", "목", "금", "토"];
    return korDays[day];
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const todayDate = new Date();

export default function Home() {
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [date, setDate] = useState<Date>(todayDate);

    const handleOpenAchievementModal = () => {
        router.push("/(app)/achievement");
    };

    const handleToggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    const handleToggleDatePicker = () => {
        setShowDatePicker((prev) => !prev);
    };

    const handleChangeDate = (date: string | Date) => {
        if (typeof date === "string") {
            setDate(new Date(date));
        } else {
            setDate(date);
        }
    };
    return (
        <Box className="flex-1 bg-grey-800">
            <Box className="flex-row items-center justify-between px-6">
                <Box className="relative flex-row items-center gap-x-2">
                    <Pressable onPress={handleToggleDatePicker}>
                        <Text className="text-2xl font-bold">
                            {date.getFullYear()}년 {date.getMonth() + 1}월
                        </Text>
                    </Pressable>
                    <Pressable onPress={handleToggleCalendar}>
                        <ChevronDown color="#ffffff" size={24} />
                    </Pressable>
                    {showDatePicker && (
                        <Modal
                            isOpen={showDatePicker}
                            onClose={() => {
                                setShowDatePicker(false);
                            }}
                            size="lg"
                        >
                            <ModalBackdrop />
                            <ModalContent className="border-2 border-primary-300 bg-grey-700">
                                <DateTimePicker
                                    mode="date"
                                    value={date}
                                    display="inline"
                                    onChange={(_, date) =>
                                        handleChangeDate(date as Date)
                                    }
                                />
                            </ModalContent>
                        </Modal>
                    )}
                </Box>

                <TouchableOpacity onPress={handleOpenAchievementModal}>
                    <ChartLine color="#ffffff" size={24} />
                </TouchableOpacity>
            </Box>
            <Box className="my-4 flex-1">
                <CalendarProvider
                    date={formatDate(date)}
                    onDateChanged={handleChangeDate}
                >
                    {showCalendar && (
                        <ExpandableCalendar
                            theme={{
                                calendarBackground: colors["--color-grey-800"],
                                textSectionTitleColor:
                                    colors["--color-primary-300"],
                                selectedDayTextColor: "#ffffff",
                                selectedDayBackgroundColor:
                                    colors["--color-primary-300"],
                                dayTextColor: "#ffffff",
                                todayTextColor: colors["--color-primary-300"],
                                monthTextColor: "#ffffff",
                                arrowColor: colors["--color-primary-300"],
                                textDayFontWeight: "300",
                                textMonthFontWeight: "bold",
                                textDayHeaderFontWeight: "300",
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 13,
                            }}
                            allowShadow={false}
                            firstDay={1}
                        />
                    )}

                    <Box className="px-6">
                        <Box className="flex-row rounded-lg bg-grey-700">
                            <Box className="items-center gap-2 p-2.5">
                                <Text className="text-2xl font-bold">
                                    {convertDayToKor(date.getDay())}
                                </Text>
                                <Text className="font-bold text-grey-400">
                                    {date.getDate()}일
                                </Text>
                            </Box>
                            <VStack space="xs" className="flex-1 p-2.5">
                                <Text className="text-sm font-bold">
                                    오늘 학습 리스트
                                </Text>
                                <Box className="relative">
                                    <Box className="absolute bottom-0 left-0 top-0 w-[2px] rounded-l-lg bg-[#8484FF]"></Box>
                                    <Text className="ml-2 text-sm text-grey-300">
                                        학습 이름
                                    </Text>
                                </Box>
                                <Box className="relative">
                                    <Box className="absolute bottom-0 left-0 top-0 w-[2px] rounded-l-lg bg-[#F6A9FD]"></Box>
                                    <Text className="ml-2 text-sm text-grey-300">
                                        학습 이름
                                    </Text>
                                </Box>
                                <Box className="relative">
                                    <Box className="absolute bottom-0 left-0 top-0 w-[2px] rounded-l-lg bg-[#B9A6FF]"></Box>
                                    <Text className="ml-2 text-sm text-grey-300">
                                        학습 이름
                                    </Text>
                                </Box>
                            </VStack>
                        </Box>
                    </Box>
                </CalendarProvider>
            </Box>
        </Box>
    );
}
