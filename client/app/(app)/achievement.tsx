import {
    Accordion,
    AccordionContent,
    AccordionContentText,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionTitleText,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";

interface AchievementScreenProps {}

export default function AchievementScreen({}: AchievementScreenProps) {
    return (
        <Box className="flex-1 bg-dark-default">
            <Accordion
                size="md"
                variant="filled"
                type="single"
                isCollapsible={true}
                isDisabled={false}
                className="bg-transparent"
            >
                <AccordionItem value="a">
                    <AccordionHeader className="bg-dark-default">
                        <AccordionTrigger>
                            {({ isExpanded }) => {
                                return (
                                    <>
                                        <AccordionTitleText className="text-xl">
                                            학습 이름
                                        </AccordionTitleText>
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
                    <AccordionContent>
                        <AccordionContentText>
                            To place an order, simply select the products you
                            want, proceed to checkout, provide shipping and
                            payment information, and finalize your purchase.
                        </AccordionContentText>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Box>
    );
}
