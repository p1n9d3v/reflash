import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Modal, FlatList} from 'react-native';
import {router} from 'expo-router';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSession} from '@/context/session';
import {getUserDecks} from '@/apis/deck';
import {getDeckCards} from '@/apis/card';
import {format, addDays, addMonths, subMonths, getMonth, getYear} from 'date-fns';
import {ko} from 'date-fns/locale';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {BlurView} from 'expo-blur';
import RadialGradient from 'react-native-radial-gradient';
import {Deck} from "@/models/deck";
import {Card} from "@/models/card";
import {Timestamp} from "@react-native-firebase/firestore";

const getLocalDateString = (timestamp: Timestamp) => {
    const date = new Date(0);
    date.setUTCSeconds(timestamp.seconds);

    date.setDate(date.getDate() - 1);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default function HomeScreen() {
    const {user} = useSession();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [decks, setDecks] = useState<Deck[]>([]);
    const [dueItems, setDueItems] = useState<{ [key: string]: { card: Card, deckName: string }[] }>({});
    const [loading, setLoading] = useState(true);
    const [monthSelectorVisible, setMonthSelectorVisible] = useState(false);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    const currentDayIndex = currentDate.getDay();
    const currentDayName = weekdays[currentDayIndex];
    const currentDay = currentDate.getDate();

    const loadData = async () => {
        try {
            setLoading(true);
            if (user) {
                const userDecks = await getUserDecks(user.uid);
                setDecks(userDecks);

                const allDueCards: { [key: string]: { card: Card, deckName: string }[] } = {};

                for (const deck of userDecks) {
                    const cards = await getDeckCards(deck.id);

                    cards.forEach(card => {
                        const dueDate = getLocalDateString(card.nextReviewDate);
                        if (!allDueCards[dueDate]) {
                            allDueCards[dueDate] = [];
                        }

                        allDueCards[dueDate].push({
                            card,
                            deckName: deck.name
                        });
                    });
                }

                setDueItems(allDueCards);
            }
        } catch (error) {
            console.error('데이터 로드 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [user, currentDate]);

    const handleStartTodayStudy = () => {
        router.push('/today-study');
    };

    const getFormattedMonth = () => {
        return format(currentDate, 'yyyy년 M월', {locale: ko});
    };

    const showMonthSelector = () => {
        setMonthSelectorVisible(true);
    };

    const handleSelectMonth = (monthIndex: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(monthIndex);
        setCurrentDate(newDate);
        setMonthSelectorVisible(false);
    };

    const getTodayDueItems = () => {
        const today = format(currentDate, 'yyyy-MM-dd');
        return dueItems[today] || [];
    };

    const getNextDays = () => {
        const days = [];
        for (let i = 1; i <= 5; i++) {
            const nextDay = addDays(currentDate, i);
            const dayOfWeek = weekdays[nextDay.getDay()];
            const dayOfMonth = nextDay.getDate();
            const dateStr = format(nextDay, 'yyyy-MM-dd');

            days.push({
                weekday: dayOfWeek,
                day: dayOfMonth,
                dateStr,
                items: dueItems[dateStr] || []
            });
        }
        return days;
    };

    const todayItems = getTodayDueItems();
    const nextDays = getNextDays();

    return (
        <SafeAreaView className="flex-1 bg-[#1B1B1E]">
            <View className="flex-1">
                {/* 헤더 - 로고 및 앱 이름 */}
                <View className="px-4 py-3 flex-row items-center">
                    <Image
                        source={require('../../assets/images/logo.png')}
                        className="h-8 w-8 mr-3"
                    />
                    <Text className="text-white text-3xl font-bold">BRAINI</Text>
                </View>

                {/* 월 선택 */}
                <View className="px-4 py-4 flex-row items-center justify-between">
                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={showMonthSelector}
                    >
                        <Text className="text-white text-2xl font-bold mr-2">
                            {getFormattedMonth()}
                        </Text>
                        <Ionicons name="chevron-down" size={26} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/stats')}>
                        <Image
                            source={require('../../assets/images/chart.png')}
                            className="h-7 w-7"
                        />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#00B894" className="flex-1"/>
                ) : (
                    <ScrollView style={{paddingBottom: 75}}>
                        {/* 오늘 학습 리스트 */}
                        <View className="px-4 mt-3 mb-4">
                            <View className="bg-[#222222] rounded-lg p-4">
                                <View className="flex-row mb-4 items-start">
                                    <View className="w-6 items-center">
                                        <Text className="text-white text-2xl font-bold">{currentDayName}</Text>
                                        <Text className="text-[#9F9FA8] text-base mt-1">{currentDay}일</Text>
                                    </View>
                                    <View className="ml-6 flex-1">
                                        <Text className="text-white text-base">오늘 학습 리스트</Text>
                                        <View className="mt-3">
                                            {todayItems.length > 0 ? (
                                                todayItems.map((item, index) => (
                                                    <View key={index} className="mb-3 flex-row items-center">
                                                        <View className="w-1 h-14 rounded-full bg-[#4169E1] mr-3"/>
                                                        <Text className="text-white text-base">
                                                            {item.deckName || '학습 이름'}
                                                        </Text>
                                                    </View>
                                                ))
                                            ) : (
                                                <Text className="text-gray-400 text-base">오늘 학습 항목이 없습니다</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* 오늘 학습 시작 버튼 */}
                        <TouchableOpacity
                            className="mx-4 mb-5 bg-[#009883] rounded-lg py-4 px-4 flex-row items-center justify-between"
                            onPress={handleStartTodayStudy}
                        >
                            <Text className="text-white text-lg font-medium">오늘 학습 시작</Text>
                            <Ionicons name="chevron-forward" size={26} color="white"/>
                        </TouchableOpacity>

                        {/* 다음 날짜들 - 구분선 짧게 */}
                        {nextDays.map((day, index) => (
                            <View key={index}>
                                <View className="px-4 py-5 flex-row items-start">
                                    <View className="w-12 h-20 items-center">
                                        <Text className="text-white text-2xl font-bold">{day.weekday}</Text>
                                        <Text className="text-[#9F9FA8] text-base mt-1">{day.day}일</Text>
                                    </View>

                                    {day.items.length > 0 ? (
                                        <View className="ml-6 flex-row items-center">
                                            <View className="w-1 h-14 rounded-full bg-[#4169E1] mr-3"/>
                                            <Text className="text-white text-base">{day.items[0].deckName}</Text>
                                            {day.items.length > 1 && (
                                                <Text className="text-[#4169E1] ml-4 text-base">더보기
                                                    +{day.items.length - 1}</Text>
                                            )}
                                        </View>
                                    ) : null}
                                </View>
                                {/* 구분선 짧게 수정 */}
                                <View className="mx-4 h-[0.5px] bg-[#333333]"/>
                            </View>
                        ))}

                        {/* 하단 여백 추가 */}
                        <View style={{height: 90}}/>
                    </ScrollView>
                )}

                {/* 하단 탭 네비게이션 - 선택된 탭에 RadialGradient 효과 적용 */}
                <View style={styles.navContainer}>
                    <BlurView
                        intensity={50}
                        tint="dark"
                        style={styles.bottomTab}
                    >
                        <TouchableOpacity style={styles.tabItem}>
                            {/* 선택된 탭에 RadialGradient 효과 추가 */}
                            <View style={styles.tabGradientContainer}>
                                <RadialGradient
                                    style={styles.tabRadialGradient}
                                    colors={['#00B894', 'transparent']}
                                    stops={[0, 0.7]}
                                    radius={70}
                                />
                            </View>
                            <MaterialIcons name="home" size={24} color="#4CD3C2"/>
                            <Text style={styles.tabTextActive}>홈</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => router.push('/flashcards')}
                        >
                            <Image
                                source={require('../../assets/images/cardlist.png')}
                                className="h-7 w-7"
                            />
                            <Text style={styles.tabText}>카드 리스트</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => router.push('/profile')}
                        >
                            <Image
                                source={require('../../assets/images/profile.png')}
                                className="h-7 w-7"
                            />
                            <Text style={styles.tabText}>마이페이지</Text>
                        </TouchableOpacity>
                    </BlurView>
                </View>

                {/* 월 선택 모달 */}
                <Modal
                    visible={monthSelectorVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setMonthSelectorVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{getYear(currentDate)}년</Text>
                                <TouchableOpacity onPress={() => setMonthSelectorVisible(false)}>
                                    <Ionicons name="close" size={24} color="white"/>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={monthNames}
                                numColumns={3}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.monthItem,
                                            getMonth(currentDate) === index && styles.selectedMonth
                                        ]}
                                        onPress={() => handleSelectMonth(index)}
                                    >
                                        <Text
                                            style={[
                                                styles.monthText,
                                                getMonth(currentDate) === index && styles.selectedMonthText
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />

                            <View style={styles.yearSelector}>
                                <TouchableOpacity
                                    style={styles.yearButton}
                                    onPress={() => {
                                        const newDate = subMonths(currentDate, 12);
                                        setCurrentDate(newDate);
                                    }}
                                >
                                    <Ionicons name="chevron-back" size={24} color="white"/>
                                    <Text style={styles.yearButtonText}>이전 해</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.yearButton}
                                    onPress={() => {
                                        const newDate = addMonths(currentDate, 12);
                                        setCurrentDate(newDate);
                                    }}
                                >
                                    <Text style={styles.yearButtonText}>다음 해</Text>
                                    <Ionicons name="chevron-forward" size={24} color="white"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: 'rgba(32, 32, 32, 0.6)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    tabItem: {
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        zIndex: 2,
    },
    tabGradientContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabRadialGradient: {
        position: 'absolute',
        width: 140,
        height: 140,
        opacity: 0.35,
    },
    tabText: {
        color: 'white',
        fontSize: 12,
        marginTop: 4,
    },
    tabTextActive: {
        color: '#4CD3C2',
        fontSize: 12,
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#222',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    monthItem: {
        flex: 1,
        padding: 15,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    selectedMonth: {
        backgroundColor: '#4169E1',
    },
    monthText: {
        color: 'white',
        fontSize: 16,
    },
    selectedMonthText: {
        fontWeight: 'bold',
    },
    yearSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    yearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    yearButtonText: {
        color: 'white',
        marginHorizontal: 5,
    }
});