import { View } from "react-native";

interface SpaceProps {
    horizontal?: boolean;
    vertical?: boolean;
    size: number;
}

export default function Space(props: SpaceProps) {
    const { horizontal, vertical, size } = props;

    return (
        <View
            style={{
                width: horizontal ? size : undefined,
                height: vertical ? size : undefined,
            }}
        ></View>
    );
}
