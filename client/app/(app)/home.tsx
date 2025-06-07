import { ChartLine, ChevronDown, ChevronRight, X } from "lucide-react-native";
import { useState, useCallback, useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import {
    CalendarProvider,
    ExpandableCalendar,
    AgendaList,
} from "react-native-calendars";

import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import {
    agendaItems,
    getMarkedDates,
    type StudyItem,
} from "@/mocks/agendaItems";
import { useRouter } from "expo-router";

const AgendaItem = ({ item }: { item: StudyItem }) => {
    return (
        <TouchableOpacity style={styles.agendaItem} activeOpacity={0.7}>
            <Box className="flex-row items-center justify-between">
                <Box className="flex-1">
                    <Text className="mb-1 text-base font-medium text-white">
                        {item.title}
                    </Text>
                    {item.description && (
                        <Text className="text-sm text-gray-400">
                            {item.description}
                        </Text>
                    )}
                </Box>
                {/* <ChevronRight color={colors["--color-grey-200"]} size={18} /> */}
            </Box>
        </TouchableOpacity>
    );
};

export default function Home() {
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const marked = useRef(getMarkedDates());
    const calendarRef = useRef<any>(null);
    const rotation = useRef(new Animated.Value(0));

    const router = useRouter();

    const today = new Date().toISOString().split("T")[0];
    const currentMonth = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
    });

    const toggleCalendarExpansion = useCallback(() => {
        const isOpen = calendarRef.current?.toggleCalendarPosition();
        Animated.timing(rotation.current, {
            toValue: isOpen ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    }, []);

    const openAchievementModal = () => {
        router.push("/(app)/achievement");
    };

    const renderHeader = useCallback(
        (date?: any) => {
            const rotationInDegrees = rotation.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "-180deg"],
            });

            const displayMonth = date
                ? date.toString("yyyy년 M월")
                : currentMonth.replace("년", "년 ");

            return (
                <Box className="p-6">
                    <Box className="text-grey w-full flex-row items-center">
                        <TouchableOpacity
                            className="flex-row items-center gap-x-2"
                            activeOpacity={0.8}
                            onPress={toggleCalendarExpansion}
                        >
                            <Text className="text-xl font-bold">
                                {displayMonth}
                            </Text>
                            <Animated.View
                                style={{
                                    transform: [{ rotate: rotationInDegrees }],
                                }}
                            >
                                <ChevronDown color="#ffffff" size={24} />
                            </Animated.View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openAchievementModal}>
                            <ChartLine color="#ffffff" size={24} />
                        </TouchableOpacity>
                    </Box>
                </Box>
            );
        },
        [currentMonth, toggleCalendarExpansion],
    );

    const onCalendarToggled = useCallback((isOpen: boolean) => {
        rotation.current.setValue(isOpen ? 1 : 0);
    }, []);

    const renderItem = useCallback(({ item }: { item: StudyItem }) => {
        return <AgendaItem item={item} />;
    }, []);

    return (
        <Box className="flex-1 bg-grey-800">
            {/* <CalendarProvider */}
            {/*     date={today} */}
            {/*     theme={{ */}
            {/*         todayButtonTextColor: colors["--color-primary-default"], */}
            {/*     }} */}
            {/*     showTodayButton */}
            {/* > */}
            {/*     <ExpandableCalendar */}
            {/*         ref={calendarRef} */}
            {/*         renderHeader={renderHeader} */}
            {/*         onCalendarToggled={onCalendarToggled} */}
            {/*         firstDay={1} */}
            {/*         markedDates={marked.current} */}
            {/*         theme={{ */}
            {/*             backgroundColor: colors["--color-background-default"], */}
            {/*             calendarBackground: */}
            {/*                 colors["--color-background-default"], */}
            {/*             textSectionTitleColor: */}
            {/*                 colors["--color-primary-default"], */}
            {/*             selectedDayTextColor: "#ffffff", */}
            {/*             selectedDayBackgroundColor: */}
            {/*                 colors["--color-primary-default"], */}
            {/*             dayTextColor: "#ffffff", */}
            {/*             todayTextColor: colors["--color-primary-default"], */}
            {/*             monthTextColor: "#ffffff", */}
            {/*             arrowColor: colors["--color-primary-default"], */}
            {/*             textDayFontWeight: "300", */}
            {/*             textMonthFontWeight: "bold", */}
            {/*             textDayHeaderFontWeight: "300", */}
            {/*             textDayFontSize: 16, */}
            {/*             textMonthFontSize: 16, */}
            {/*             textDayHeaderFontSize: 13, */}
            {/*         }} */}
            {/*         initialPosition={undefined} */}
            {/*     /> */}
            {/**/}
            {/*     <Box className="px-6 pb-4"> */}
            {/*         <Button */}
            {/*             variant="solid" */}
            {/*             className="h-14 flex-row items-center justify-center bg-primary-default data-[active=true]:bg-[#007B6D]" */}
            {/*         > */}
            {/*             <ButtonText className="text-xl font-bold text-gray-50 data-[active=true]:text-gray-50"> */}
            {/*                 오늘 학습 시작 */}
            {/*             </ButtonText> */}
            {/*             <ButtonIcon as={ChevronRight} color="#ffffff" /> */}
            {/*         </Button> */}
            {/*     </Box> */}
            {/**/}
            {/*     <Box className="flex-1 pb-32"> */}
            {/*         <AgendaList */}
            {/*             sections={agendaItems} */}
            {/*             renderItem={renderItem} */}
            {/*             sectionStyle={styles.sectionHeader} */}
            {/*             dayFormat={"M월 d일 (ddd)"} */}
            {/*             showsVerticalScrollIndicator={false} */}
            {/*             stickySectionHeadersEnabled={true} */}
            {/*         /> */}
            {/*     </Box> */}
            {/* </CalendarProvider> */}
        </Box>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    agendaItem: {
        marginHorizontal: 24,
        marginVertical: 4,
        padding: 16,
    },
});
