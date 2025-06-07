import OAuthButton from "@/components/sign/OAuthButton";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSession } from "@/context/session";
import { View } from "react-native";
import RadialGradient from "react-native-radial-gradient";

export default function SignIn() {
    const { signInWithGoogle } = useSession();

    return (
        <View className="flex-1 justify-between bg-grey-800 px-6 pb-20 pt-36">
            <VStack space="2xl">
                <Box className="relative">
                    <RadialGradient
                        className="absolute -left-[180px] -top-[180px] h-[500px] w-[500px]"
                        colors={["#009883", "transparent"]}
                        stops={[0, 1]}
                        radius={200}
                        center={[200, 200]}
                    />
                    <Image
                        source={require("../assets/images/logo.png")}
                        className="h-10 w-10"
                    />
                </Box>

                <Text className="text-4xl font-bold text-typography-100">
                    안녕하세요{"\n"}
                    <Text className="text-4xl text-primary-300">
                        Braini
                    </Text>{" "}
                    입니다.
                </Text>
                <Text className="text-2xl text-typography-100">
                    간편 로그인 후 {"\n"}
                    학습을 시작해보세요.
                </Text>
            </VStack>
            <VStack space="md">
                <OAuthButton provider="google" onPress={signInWithGoogle} />
                <OAuthButton provider="apple" />
            </VStack>
        </View>
    );
}
