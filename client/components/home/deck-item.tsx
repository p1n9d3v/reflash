import { Box } from "../ui/box";
import { Text } from "../ui/text";

interface DeckItemProps {
    title: string;
    color: string;
}

export default function DeckItem(props: DeckItemProps) {
    const { title, color } = props;

    return (
        <Box className="relative">
            <Box
                className="absolute bottom-0 left-0 top-0 w-[2px] rounded-l-lg"
                style={{ backgroundColor: color }}
            ></Box>
            <Text className="ml-2 text-sm text-grey-300">{title}</Text>
        </Box>
    );
}
