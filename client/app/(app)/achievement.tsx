import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Box } from "@/components/ui/box";
import { colors } from "@/components/ui/gluestack-ui-provider/config";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { useState } from "react";
import { Text } from "react-native";
import * as Progress from "react-native-progress";

interface AchievementScreenProps {}

export default function AchievementScreen({}: AchievementScreenProps) {
    const [progressValue, setProgressValue] = useState(0.4);

    const goalTextColorClass =
        progressValue === 1 ? "text-primary-default" : "text-gray-600";

    return (
        <Box className="flex-1 bg-grey-800">
            <Accordion
                size="md"
                variant="filled"
                type="single"
                isCollapsible={true}
                isDisabled={false}
                className="bg-grey-800"
            >
                <AccordionItem value="a">
                    <AccordionHeader className="bg-grey-800">
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <Text className="text-xl text-white">
                                            학습 이름
                                        </Text>
                                        {isExpanded ? (
                                            <AccordionIcon
                                                as={ChevronUpIcon}
                                                className="ml-3"
                                                size="xl"
                                            />
                                        ) : (
                                            <AccordionIcon
                                                as={ChevronDownIcon}
                                                className="ml-3"
                                                size="xl"
                                            />
                                        )}
                                    </>
                                );
                            }}
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="bg-grey-800 py-10">
                        <Box>
                            <Heading className="text-xl font-bold text-white">
                                학습 완료율
                            </Heading>
                            <Box className="relative mt-2.5 h-10 w-full">
                                <Progress.Bar
                                    progress={progressValue}
                                    color={colors["--color-primary-300"]}
                                    width={null}
                                />
                                <Text
                                    style={{
                                        left: `${progressValue * 100}%`,
                                        transform: [{ translateX: -10 }],
                                    }}
                                    className="text-primary-default absolute bottom-0 text-sm font-bold"
                                >
                                    {`${Math.round(progressValue * 100)}%`}
                                </Text>

                                <Text
                                    className={`absolute bottom-0 right-0 text-sm ${goalTextColorClass}`}
                                >
                                    Goal
                                </Text>
                            </Box>
                        </Box>
                        <Box className="flex-col gap-6">
                            <Heading className="text-xl">오답 노트</Heading>
                            <HStack>
                                <VStack
                                    space="xl"
                                    className="flex-1 justify-between"
                                >
                                    <Box>
                                        <Text className="text-gray-500">
                                            학습 횟수
                                        </Text>
                                        <Text className="mt-2 text-lg font-bold text-white">
                                            6회
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text className="text-gray-500">
                                            전체 문제 수
                                        </Text>
                                        <Text className="mt-2 text-lg font-bold text-white">
                                            6회
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text className="text-gray-500">
                                            평균 오답 수
                                        </Text>
                                        <Text className="mt-2 text-lg font-bold text-white">
                                            6회
                                        </Text>
                                    </Box>
                                </VStack>
                                <Box>
                                    <Progress.Circle
                                        progress={progressValue}
                                        size={200}
                                        thickness={30}
                                        color={colors["--color-primary-300"]}
                                        strokeCap="round"
                                        showsText={true}
                                        formatText={() => {
                                            return `${Math.round(progressValue * 100)}%`;
                                        }}
                                    />
                                </Box>
                            </HStack>
                        </Box>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Box>
    );
}
