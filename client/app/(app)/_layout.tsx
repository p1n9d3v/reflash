import { Box } from "@/components/ui/box";
import { colors } from "@/components/ui/gluestack-ui-provider/config";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, usePathname, useRouter } from "expo-router";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

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
            <Stack
                initialRouteName="home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors["--color-background-default"],
                    },
                }}
            >
                <Stack.Screen
                    name="achievement"
                    options={{
                        presentation: "modal",
                        headerTitle: "학습 성취 그래프",
                        headerTitleStyle: {
                            color: colors["--color-white"],
                        },
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
                <Stack.Screen
                    name="home"
                    options={{
                        headerTitleAlign: "left",
                        headerTitle: () => null, // 기본 타이틀 제거
                        headerLeft: () => (
                            <Box className="flex-row items-center gap-x-2">
                                <Image
                                    source={require("assets/images/logo.png")}
                                    className="h-6 w-6"
                                />
                                <Text className="text-3xl font-black text-white">
                                    BRAINI
                                </Text>
                            </Box>
                        ),
                    }}
                />
            </Stack>

            <Box
                style={{
                    overflow: "hidden",
                    position: "absolute",
                    bottom: 40,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <BlurView
                    style={{
                        width: tabBarWidth,
                        height: 90,
                        borderRadius: 50,
                        overflow: "hidden",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly", // 균등한 간격으로 배치
                        borderWidth: 2,
                        borderColor: colors["--color-grey-700"],
                    }}
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
                                style={{
                                    alignItems: "center", // 아이콘과 텍스트 중앙 정렬
                                    paddingHorizontal: 15, // 좌우 여백 추가
                                }}
                                onPress={() => router.push(tab.path)}
                            >
                                <FontAwesome
                                    size={28}
                                    name={tab.icon}
                                    color={
                                        isActive
                                            ? colors["--color-primary-default"]
                                            : colors["--color-grey-200"]
                                    }
                                />
                                <Text
                                    style={{
                                        color: colors["--color-white"],
                                        marginTop: 5,
                                        fontSize: 12,
                                    }}
                                >
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
