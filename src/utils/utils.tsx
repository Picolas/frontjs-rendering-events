export function dateToMinute(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
}

export function getRandomColor(): { color: string, darkerColor: string } {
    const colors = [
        '#818cf8',
        '#a78bfa',
        '#c084fc',
        '#f472b6',
        '#fb7185',
    ];

    const darkerColors = [
        '#5e66b6',
        '#7a68bd',
        '#9464c0',
        '#b7568b',
        '#c55c69',
    ]

    const random = Math.floor(Math.random() * colors.length);

    return {
        color: colors[random],
        darkerColor: darkerColors[random],
    }
}