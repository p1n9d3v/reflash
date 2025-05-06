import OAuthButton from '@/components/sign/OAuthButton';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useSession } from '@/context/session';
import { View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';

export default function SignIn() {
    const { signInWithGoogle } = useSession();

    return (
        <View className="flex-1 px-6 pt-36 pb-20 justify-between">
            <Box className="flex-col gap-y-5">
                <Box className="relative">
                    <RadialGradient
                        className="absolute -left-[120px] -top-[120px]  h-[280px] w-[280px]"
                        colors={['#009883', 'transparent']}
                        stops={[0, 1]}
                        radius={100}
                    />
                    <Image
                        source={require('../assets/images/logo.png')}
                        className="h-10 w-10"
                    />
                </Box>

                <Text className="text-4xl font-bold">
                    안녕하세요{'\n'}
                    BRAINI입니다.
                </Text>
                <Text className="text-2xl">
                    간편 로그인 후 {'\n'}
                    학습을 시작해보세요.
                </Text>
            </Box>
            <Box className="flex-col gap-y-2">
                <OAuthButton provider="google" onPress={signInWithGoogle} />
                <OAuthButton provider="apple" />
            </Box>
        </View>
    );
}
