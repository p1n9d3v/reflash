import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import React from 'react';
import { FlatList, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-background-dark">
            <Button>
                <ButtonText>로그아웃</ButtonText>
            </Button>
            {
                <FlatList
                    data={Array.from({ length: 100 }, () => Math.random())}
                    renderItem={({ item }) => (
                        <Box className="h-[100px] w-full">
                            <Text>
                                Lorem Ipsum is simply dummy text of | the
                                printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever
                                since the 1500s, when an unknown printer took a
                                galley of type and scrambled it to make a type
                                specimen book. It has survived not only five
                                centuries, but also the leap into electronic
                                typesetting, remaining essentially unchanged. It
                                was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                            </Text>
                        </Box>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            }
        </View>
    );
}
