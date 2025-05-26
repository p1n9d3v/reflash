import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { colors } from "@/components/ui/gluestack-ui-provider/config";
import { Heading } from "@/components/ui/heading";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { ChartLine, ChevronDown, ChevronRight, X } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    return (
        <Box className="flex-1 bg-dark-default">
            <Box className="flex-row justify-between p-6">
                <TouchableOpacity
                    className="flex-row items-center gap-x-2"
                    activeOpacity={0.8}
                    onPress={() => setShowModal(true)}
                >
                    <Text className="text-xl font-bold">2025년 3월</Text>
                    <ChevronDown color="#ffffff" size={24} />
                </TouchableOpacity>

                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                    size="md"
                >
                    <ModalBackdrop />
                    <ModalContent className="bg-dark-default">
                        <ModalHeader>
                            <Heading size="md" className="text-typography-950">
                                Calendar
                            </Heading>
                            <ModalCloseButton>
                                <X />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <Calendar
                                onDayPress={(day: any) => {
                                    console.log("selected day", day);
                                }}
                                theme={{
                                    backgroudColor:
                                        colors["--color-background-default"],
                                    calendarBackground:
                                        colors["--color-background-default"],
                                    textSelectionTitleColor:
                                        colors["--color-primary-default"],
                                    selectedDayTextColor:
                                        colors["--color-primary-default"],
                                    dayTextColor: "#fff",
                                    todayTextColor:
                                        colors["--color-primary-default"],
                                    monthTextColor: "#fff",
                                    arrowColor:
                                        colors["--color-primary-default"],
                                }}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <ChartLine color="#ffffff" size={24} />
            </Box>
            <Box></Box>
            <Button
                variant="solid"
                className="h-14 flex-row items-center justify-center bg-primary-default data-[active=true]:bg-[#007B6D]"
            >
                <ButtonText className="text-xl font-bold text-gray-50 data-[active=true]:text-gray-50">
                    오늘 학습 시작
                </ButtonText>
                <ButtonIcon as={ChevronRight} color="#ffffff" />
            </Button>
            <Text></Text>
        </Box>
    );
}
