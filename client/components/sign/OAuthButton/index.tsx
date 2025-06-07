import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { ComponentProps } from "react";

interface OAuthButtonProps extends ComponentProps<typeof Button> {
    provider: "google" | "apple";
}

export default function OAuthButton(props: OAuthButtonProps) {
    const { provider, ...rest } = props;

    if (provider === "google") {
        return (
            <Button
                className="justify-between bg-white data-[active=true]:bg-white"
                size="xl"
                {...rest}
            >
                <Image
                    source={require("/assets/images/google.png")}
                    className="h-6 w-6"
                />
                <Text className="flex-1 text-center text-black">
                    Google로 로그인하기
                </Text>
            </Button>
        );
    }

    return (
        <Button
            className="justify-between bg-[#0c0c0d] data-[active=true]:bg-[#0c0c0d]"
            size="xl"
            {...rest}
        >
            <Image
                source={require("/assets/images/apple.png")}
                className="h-6 w-6"
            />
            <Text className="flex-1 text-center text-white">
                Apple로 로그인하기
            </Text>
        </Button>
    );
}
