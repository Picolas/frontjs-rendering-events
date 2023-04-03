export function dateToMinute(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}

export function getRandomColor(): string {
    const colors = [
        '#818cf8',
        '#a78bfa',
        '#c084fc',
        '#f472b6',
        '#fb7185',
        '#f43f5e',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}