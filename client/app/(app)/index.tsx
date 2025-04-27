import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function Home() {
    return (
        <SafeAreaView className="flex-1">
            <Box className="flex-1 bg-black h-[100vh]">
                <Text className="text-typography-400 mt-2">Hello World</Text>
            </Box>
        </SafeAreaView>
    );
}
