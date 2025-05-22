import { Button, ButtonText } from '@/components/ui/button';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CardsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background-dark">
            <Button>
                <ButtonText>로그아웃</ButtonText>
            </Button>
        </SafeAreaView>
    );
}
