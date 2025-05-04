import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { colors } from '@/components/ui/gluestack-ui-provider/config';
import { useSession } from '@/context/session';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function RootLayout() {
    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const { signOut } = useSession();
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors['--color-background-default'],
                },
                headerRight: () => (
                    <Box>
                        <Button className="bg-background-400" onPress={signOut}>
                            <Text className="text-white">로그아웃</Text>
                        </Button>
                    </Box>
                ),
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}
