export const convertDayToKor = (day: number) => {
    const korDays = ["일", "월", "화", "수", "목", "금", "토"];
    return korDays[day];
};

export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const getWeekDays = (date: Date) => {
    const dates = [];
    const currentDay = date.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(
        date.getTime() + mondayOffset * 24 * 60 * 60 * 1000,
    );

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(
            monday.getTime() + i * 24 * 60 * 60 * 1000,
        );
        const formattedDate = formatDate(currentDate);
        dates.push(formattedDate);
    }

    return dates;
};
