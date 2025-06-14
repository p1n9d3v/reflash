import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ChartLine, ChevronDown, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { colors } from "@/components/ui/gluestack-ui-provider/config";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { agendaItems } from "@/mocks/agendaItems";
import DayItem from "@/components/home/day-item";
import DeckItem from "@/components/home/deck-item";
import { convertDayToKor, formatDate, getWeekDays } from "@/utils/date";
import { Divider } from "@/components/ui/divider";

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

    const weekDays = getWeekDays(date);
    console.log(weekDays);

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
                                {[
                                    {
                                        title: "학습 이름",
                                        color: "#8484FF",
                                    },
                                    {
                                        title: "학습 이름",
                                        color: "#F6A9FD",
                                    },
                                    {
                                        title: "학습 이름",
                                        color: "#B9A6FF",
                                    },
                                ].map((item, index) => (
                                    <DeckItem
                                        key={index}
                                        title={item.title}
                                        color={item.color}
                                    />
                                ))}
                            </VStack>
                        </Box>
                    </Box>

                    <Box className="mt-2 px-6">
                        <Button className="h-[52px] justify-between rounded-lg bg-primary-300">
                            <ButtonText className="text-white">
                                오늘 학습 시작
                            </ButtonText>
                            <ButtonIcon as={ChevronRight} color="#fff" />
                        </Button>
                    </Box>

                    <Box className="my-4 flex-1 px-6">
                        <FlatList
                            data={agendaItems.filter((data) =>
                                weekDays.includes(data.date),
                            )}
                            renderItem={({ item, index }) => (
                                <DayItem
                                    key={index}
                                    date={new Date(item.date)}
                                    onChange={handleChangeDate}
                                />
                            )}
                            keyExtractor={(item, index) =>
                                `day-${item.date}-${index}`
                            }
                            ItemSeparatorComponent={() => (
                                <Divider className="bg-grey-600" />
                            )}
                            ListHeaderComponent={() => (
                                <Divider className="bg-grey-600" />
                            )}
                            ListFooterComponent={() => (
                                <Divider className="bg-grey-600" />
                            )}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            alwaysBounceVertical={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </Box>
                </CalendarProvider>
            </Box>
        </Box>
    );
}
