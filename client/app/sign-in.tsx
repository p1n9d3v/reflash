import { Button } from '@/components/ui/button';
import { useSession } from '@/context/session';
import { Text, View } from 'react-native';

export default function SignIn() {
    const { signInWithGoogle } = useSession();

    return (
        <View>
            <Button onPress={signInWithGoogle}>
                <Text>Google 로그인</Text>
            </Button>
        </View>
    );
}
