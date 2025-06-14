// dates 배열 (6월 1일-20일)
const dates = [
    "2025-06-01",
    "2025-06-02",
    "2025-06-03",
    "2025-06-04",
    "2025-06-05",
    "2025-06-06",
    "2025-06-07",
    "2025-06-08",
    "2025-06-09",
    "2025-06-10",
    "2025-06-11",
    "2025-06-12",
    "2025-06-13",
    "2025-06-14",
    "2025-06-15",
    "2025-06-16",
    "2025-06-17",
    "2025-06-18",
    "2025-06-19",
    "2025-06-20",
];

export const agendaItems = [
    {
        date: dates[0], // 2025-06-01
        data: [
            {
                id: "eng_001",
                totalQuestions: 50,
                category: "영어",
                title: "Daily Vocabulary - Business Terms",
            },
            {
                id: "eng_002",
                totalQuestions: 30,
                category: "영어",
                title: "Grammar Review - Past Perfect Tense",
            },
        ],
    },
    {
        date: dates[1], // 2025-06-02
        data: [
            {
                id: "eng_003",
                totalQuestions: 40,
                category: "영어",
                title: "Word Cards - Academic Vocabulary",
            },
            {
                id: "jpn_001",
                totalQuestions: 25,
                category: "일본어",
                title: "Hiragana Practice - Basic Characters",
            },
            {
                id: "eng_004",
                totalQuestions: 20,
                category: "영어",
                title: "Pronunciation Practice - /th/ sounds",
            },
        ],
    },
    {
        date: dates[2], // 2025-06-03
        data: [
            {
                id: "eng_005",
                totalQuestions: 35,
                category: "영어",
                title: "Phrasal Verbs Review - Set 1",
            },
            {
                id: "chn_001",
                totalQuestions: 30,
                category: "중국어",
                title: "Basic Pinyin Practice",
            },
        ],
    },
    {
        date: dates[3], // 2025-06-04
        data: [
            {
                id: "eng_006",
                totalQuestions: 45,
                category: "영어",
                title: "Idioms and Expressions - Daily Life",
            },
            {
                id: "jpn_002",
                totalQuestions: 20,
                category: "일본어",
                title: "Katakana Reading Practice",
            },
            {
                id: "eng_007",
                totalQuestions: 60,
                category: "영어",
                title: "Listening Practice - TED Talks",
            },
        ],
    },
    {
        date: dates[4], // 2025-06-05
        data: [
            {
                id: "eng_008",
                totalQuestions: 100,
                category: "영어",
                title: "TOEIC Vocabulary - Part 1-2",
            },
            {
                id: "kor_001",
                totalQuestions: 40,
                category: "한국어",
                title: "Korean Grammar - Basic Particles",
            },
        ],
    },
    {
        date: dates[5], // 2025-06-06
        data: [
            {
                id: "eng_009",
                totalQuestions: 25,
                category: "영어",
                title: "Conversation Practice - Job Interview",
            },
            {
                id: "jpn_003",
                totalQuestions: 35,
                category: "일본어",
                title: "JLPT N5 Vocabulary",
            },
            {
                id: "eng_010",
                totalQuestions: 30,
                category: "영어",
                title: "Grammar Focus - Conditional Sentences",
            },
        ],
    },
    {
        date: dates[6], // 2025-06-07
        data: [
            {
                id: "eng_011",
                totalQuestions: 50,
                category: "영어",
                title: "Weekend Reading - Short Stories",
            },
            {
                id: "chn_002",
                totalQuestions: 45,
                category: "중국어",
                title: "HSK Level 1 Characters",
            },
        ],
    },
    {
        date: dates[7], // 2025-06-08
        data: [
            {
                id: "eng_012",
                totalQuestions: 40,
                category: "영어",
                title: "Medical Terminology - Basic Words",
            },
            {
                id: "fra_001",
                totalQuestions: 30,
                category: "프랑스어",
                title: "French Alphabet & Pronunciation",
            },
            {
                id: "eng_013",
                totalQuestions: 25,
                category: "영어",
                title: "Spelling Practice - Difficult Words",
            },
        ],
    },
    {
        date: dates[8], // 2025-06-09
        data: [
            {
                id: "eng_014",
                totalQuestions: 35,
                category: "영어",
                title: "Collocations Practice - Verb + Noun",
            },
            {
                id: "jpn_004",
                totalQuestions: 40,
                category: "일본어",
                title: "Kanji Practice - Elementary Level",
            },
        ],
    },
    {
        date: dates[9], // 2025-06-10
        data: [
            {
                id: "eng_015",
                totalQuestions: 55,
                category: "영어",
                title: "Synonyms and Antonyms - Advanced Level",
            },
            {
                id: "ger_001",
                totalQuestions: 30,
                category: "독일어",
                title: "German Basic Vocabulary",
            },
            {
                id: "eng_016",
                totalQuestions: 80,
                category: "영어",
                title: "Movie Watching - English Subtitles",
            },
        ],
    },
    {
        date: dates[10], // 2025-06-11
        data: [
            {
                id: "eng_017",
                totalQuestions: 45,
                category: "영어",
                title: "Travel English - Airport & Hotel",
            },
            {
                id: "chn_003",
                totalQuestions: 35,
                category: "중국어",
                title: "Chinese Numbers & Time",
            },
        ],
    },
    {
        date: dates[11], // 2025-06-12
        data: [
            {
                id: "eng_018",
                totalQuestions: 60,
                category: "영어",
                title: "Technology Vocabulary - IT Terms",
            },
            {
                id: "jpn_005",
                totalQuestions: 30,
                category: "일본어",
                title: "Japanese Particles Practice",
            },
            {
                id: "spa_001",
                totalQuestions: 25,
                category: "스페인어",
                title: "Spanish Greetings & Basic Phrases",
            },
        ],
    },
    {
        date: dates[12], // 2025-06-13
        data: [
            {
                id: "eng_019",
                totalQuestions: 70,
                category: "영어",
                title: "Podcast Listening - Daily English",
            },
            {
                id: "kor_002",
                totalQuestions: 40,
                category: "한국어",
                title: "Korean Honorifics Practice",
            },
        ],
    },
    {
        date: dates[13], // 2025-06-14
        data: [
            {
                id: "eng_020",
                totalQuestions: 50,
                category: "영어",
                title: "Weekend Vocabulary Game - Crossword",
            },
            {
                id: "fra_002",
                totalQuestions: 35,
                category: "프랑스어",
                title: "French Basic Verbs",
            },
        ],
    },
    {
        date: dates[14], // 2025-06-15
        data: [
            {
                id: "eng_021",
                totalQuestions: 40,
                category: "영어",
                title: "Food & Cooking Vocabulary",
            },
            {
                id: "chn_004",
                totalQuestions: 45,
                category: "중국어",
                title: "Chinese Daily Conversations",
            },
            {
                id: "eng_022",
                totalQuestions: 20,
                category: "영어",
                title: "Rhyming Words Practice",
            },
        ],
    },
    {
        date: dates[15], // 2025-06-16
        data: [
            {
                id: "eng_023",
                totalQuestions: 35,
                category: "영어",
                title: "Weather & Climate Expressions",
            },
            {
                id: "jpn_006",
                totalQuestions: 50,
                category: "일본어",
                title: "JLPT N4 Grammar Points",
            },
        ],
    },
    {
        date: dates[16], // 2025-06-17
        data: [
            {
                id: "eng_024",
                totalQuestions: 45,
                category: "영어",
                title: "Sports & Fitness Vocabulary",
            },
            {
                id: "ger_002",
                totalQuestions: 30,
                category: "독일어",
                title: "German Articles & Cases",
            },
            {
                id: "eng_025",
                totalQuestions: 25,
                category: "영어",
                title: "Modal Verbs Practice",
            },
        ],
    },
    {
        date: dates[17], // 2025-06-18
        data: [
            {
                id: "eng_026",
                totalQuestions: 55,
                category: "영어",
                title: "Finance & Banking Terms",
            },
            {
                id: "spa_002",
                totalQuestions: 40,
                category: "스페인어",
                title: "Spanish Verb Conjugations",
            },
            {
                id: "eng_027",
                totalQuestions: 30,
                category: "영어",
                title: "Word Etymology Study",
            },
        ],
    },
    {
        date: dates[18], // 2025-06-19
        data: [
            {
                id: "eng_028",
                totalQuestions: 40,
                category: "영어",
                title: "Art & Culture Vocabulary",
            },
            {
                id: "jpn_007",
                totalQuestions: 35,
                category: "일본어",
                title: "Japanese Counting Systems",
            },
            {
                id: "eng_029",
                totalQuestions: 100,
                category: "영어",
                title: "Weekly Vocabulary Test Prep",
            },
        ],
    },
    {
        date: dates[19], // 2025-06-20
        data: [
            {
                id: "all_001",
                totalQuestions: 200,
                category: "종합",
                title: "Monthly Progress Review - All Languages",
            },
            {
                id: "eng_030",
                totalQuestions: 50,
                category: "영어",
                title: "Celebration Speaking Session - Free Talk",
            },
        ],
    },
];

// 언어별 통계
export const languageStats = {
    영어: 30, // English
    일본어: 7, // Japanese
    중국어: 4, // Chinese
    한국어: 2, // Korean
    프랑스어: 2, // French
    독일어: 2, // German
    스페인어: 2, // Spanish
    종합: 1, // Mixed/All
};

// 문제 난이도별 분류
export const difficultyStats = {
    초급: 15, // 20-40 questions
    중급: 20, // 41-70 questions
    고급: 15, // 71+ questions
};

// 카테고리별 평균 문제 수
export const avgQuestionsByCategory = {
    영어: 47,
    일본어: 35,
    중국어: 39,
    한국어: 40,
    프랑스어: 33,
    독일어: 30,
    스페인어: 33,
    종합: 125,
};
