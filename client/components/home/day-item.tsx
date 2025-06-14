import { convertDayToKor } from "@/utils/date";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import DeckItem from "./deck-item";
import { Pressable } from "../ui/pressable";

const MoreButton = () => {
    return (
        <Box className="flex-row items-center gap-x-2">
            <Text className="text-sm font-bold text-white">더보기 +2</Text>
        </Box>
    );
};

interface DayItemProps {
    date: Date;
    onChange: (date: Date) => void;
}

export default function DayItem(props: DayItemProps) {
    const { date } = props;

    return (
        <Pressable onPress={() => props.onChange(date)}>
            <Box className="h-[82px] flex-row">
                <Box className="w-[50px] flex-col items-center justify-center gap-2">
                    <Text className="text-2xl font-bold">
                        {convertDayToKor(date.getDay())}
                    </Text>
                    <Text className="text-grey-400">{date.getDate()}일</Text>
                </Box>

                <Box className="flex-1 justify-center gap-2 px-2.5">
                    <DeckItem title="학습 이름" color="#8484FF" />
                    <MoreButton />
                </Box>
            </Box>
        </Pressable>
    );
}
