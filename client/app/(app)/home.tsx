import { ChartLine, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
    CalendarProvider,
    ExpandableCalendar,
    WeekCalendar,
} from "react-native-calendars";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { type StudyItem } from "@/mocks/agendaItems";
import { useRouter } from "expo-router";
import { colors } from "@/components/ui/gluestack-ui-provider/config";

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

const date = new Date();

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export default function Home() {
    const displayYearMonth = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    const router = useRouter();
    const [showCalendar, setShowCalendar] = useState(false);

    const handleOpenAchievementModal = () => {
        router.push("/(app)/achievement");
    };

    const handleToggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    return (
        <Box className="flex-1 bg-grey-800">
            <Box className="flex-row items-center justify-between px-6">
                <TouchableOpacity
                    className="flex-row items-center gap-x-2"
                    activeOpacity={0.8}
                    onPress={handleToggleCalendar}
                >
                    <Text className="text-2xl font-bold text-grey-100">
                        {displayYearMonth}
                    </Text>
                    <ChevronDown color="#ffffff" size={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOpenAchievementModal}>
                    <ChartLine color="#ffffff" size={24} />
                </TouchableOpacity>
            </Box>
            <Box className="my-4">
                <CalendarProvider date={formatDate(date)}>
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
                        />
                    )}
                </CalendarProvider>
            </Box>
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
            {/* backgroundColor: colors["--color-background-default"], */}
            {/* calendarBackground: colors["--color-background-default"], */}
            {/* textSectionTitleColor: colors["--color-primary-default"], */}
            {/* selectedDayTextColor: "#ffffff", selectedDayBackgroundColor: */}
            {/* colors["--color-primary-default"], dayTextColor: "#ffffff", */}
            {/* todayTextColor: colors["--color-primary-default"], monthTextColor: */}
            {/* "#ffffff", arrowColor: colors["--color-primary-default"], */}
            {/* textDayFontWeight: "300", textMonthFontWeight: "bold", */}
            {/* textDayHeaderFontWeight: "300", textDayFontSize: 16, */}
            {/* textMonthFontSize: 16, textDayHeaderFontSize: 13, */}
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
