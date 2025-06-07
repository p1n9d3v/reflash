export interface StudyItem {
    title: string;
    description?: string;
    time?: string;
    completed?: boolean;
    type: "study" | "review" | "quiz";
}

export interface AgendaSection {
    title: string;
    data: StudyItem[];
}

const generateAgendaItems = (): AgendaSection[] => {
    const today = new Date();
    const items: AgendaSection[] = [];

    // 오늘부터 7일간의 아젠다 생성
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const dateString = currentDate.toISOString().split("T")[0];

        let data: StudyItem[] = [];

        if (i === 0) {
            data = [{ title: "오늘 학습 리스트", type: "study" }];
        } else if (i === 1) {
            data = [{ title: "학습 이름", type: "study" }];
        }

        items.push({
            title: dateString,
            data: data,
        });
    }

    return items;
};

export const agendaItems: AgendaSection[] = generateAgendaItems();

export const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};

    agendaItems.forEach((section) => {
        if (section.data.length > 0) {
            marked[section.title] = {
                marked: true,
                // dotColor: colors["--color-primary-default"],
            };
        }
    });

    const today = new Date().toISOString().split("T")[0];
    marked[today] = {
        ...marked[today],
        selected: true,
        // selectedColor: colors["--color-primary-default"],
    };

    return marked;
};

