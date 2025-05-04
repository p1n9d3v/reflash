import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSession } from '@/context/session';
import { View } from 'react-native';

export default function SignIn() {
    const { signInWithGoogle } = useSession();

    return (
        <View className="flex-1">
            <Button onPress={signInWithGoogle} className="bg-primary-default">
                <Text>Google 로그인</Text>
            </Button>
        </View>
    );
}
