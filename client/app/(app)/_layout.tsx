import { Box } from "@/components/ui/box";
import { colors } from "@/components/ui/gluestack-ui-provider/config";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { Stack, usePathname, useRouter } from "expo-router";
import {
    Dimensions,
    Platform,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";

export default function RootLayout() {
    return <RootLayoutNav />;
}

const tabs = [
    { key: "home", path: "/(app)/home", title: "홈", icon: "home" },
    { key: "cards", path: "/(app)/cards", title: "카드 리스트", icon: "cog" },
    { key: "my", path: "/(app)/my", title: "마이 페이지", icon: "user" },
] as const;

function RootLayoutNav() {
    const router = useRouter();
    const currentPath = usePathname();

    const windowWidth = Dimensions.get("window").width;
    const tabBarWidth = windowWidth * 0.8;
    return (
        <>
            <Stack initialRouteName="home">
                <Stack.Screen
                    name="achievement"
                    options={{
                        presentation: "modal",
                        headerTitle: "학습 성취 그래프",
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
                <Stack.Screen
                    name="home"
                    options={{
                        header: () => (
                            <SafeAreaView className="bg-grey-800">
                                <Box className="h-[72px] p-6">
                                    <Image
                                        source={require("assets/images/header-logo.png")}
                                        className="h-[24px] w-[87px]"
                                    />
                                </Box>
                            </SafeAreaView>
                        ),
                    }}
                />
            </Stack>

            <Box className="absolute bottom-10 w-full flex-row items-center justify-center overflow-hidden">
                <BlurView
                    style={{ width: tabBarWidth }}
                    className="border-grey-700 h-[90px] flex-row items-center justify-evenly overflow-hidden rounded-full border-2"
                    tint="dark"
                    intensity={Platform.OS === "android" ? 90 : 5} // android 100 , ios 10
                    // experimentalBlurMethod="dimezisBlurView"
                    // blurReductionFactor={90}
                >
                    {tabs.map((tab) => {
                        const isActive = currentPath.includes(tab.key);
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                className="items-center px-4"
                                onPress={() => router.push(tab.path)}
                            >
                                <FontAwesome
                                    size={28}
                                    name={tab.icon}
                                    color={
                                        isActive
                                            ? colors["--color-primary-400"]
                                            : "#fff"
                                    }
                                />
                                <Text className="mt-1 text-sm text-white">
                                    {tab.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </BlurView>
            </Box>
        </>
    );
}
