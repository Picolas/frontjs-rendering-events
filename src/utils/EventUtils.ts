import { DAY_END_HOUR, DAY_START_HOUR } from "../constants/constants";
import { Event } from "../models/Event";

export function groupEvents(columns: Event[][], containerWidth: number, containerHeight: number) {
    const n = columns.length;
    const calendarStart = DAY_START_HOUR * 60; // 09h in minutes
    const calendarEnd = DAY_END_HOUR * 60; // 21h in minutes
    const calendarDuration = calendarEnd - calendarStart;

    columns.forEach((column: Event[], i: number) => {
        const availableWidth = containerWidth;
        let left = (i / n) * availableWidth;

        column.forEach((event: Event) => {
            const startTime = dateToMinute(event.start);
            event.left = left;
            event.top = ((startTime - calendarStart) / calendarDuration) * containerHeight;
            event.height = (event.duration / calendarDuration) * containerHeight;
            event.width = availableWidth * expendEvent(event, i, columns) / n;
            event.backgroundColor = getRandomColor();
        });
    });

    return columns;
}

export function expendEvent(event: Event, columnIndex: number, columns: Event[][]) {
    let colSpan = 1;

    columns.forEach((column: Event[], i: number) => {
        if (i <= columnIndex) return;
        if (column.some((e: Event) => isOverlapping(event, e))) return;
        colSpan++;
    });

    return colSpan;
}

export function groupOverlappingEvents(events: Event[], containerWidth: number, containerHeight: number): Event[] {
    events.sort((a, b) => dateToMinute(a.start) - dateToMinute(b.start));

    let result: Event[] = [];
    let columns: Event[][] = [];

    let lastHighestEndTime: number | null = null;

    for (const event of events) {
        const startTime = dateToMinute(event.start);

        // Si rupture alors on ne chevauche plus le bloc précédent
        if (lastHighestEndTime !== null && startTime >= lastHighestEndTime) {
            const groupedColumns = groupEvents(columns, containerWidth, containerHeight);
            result.push(...groupedColumns.flat());
            columns = [];
            lastHighestEndTime = null;
        }

        // On cherche dans quelle colonne on peut placer l’événement
        let isPlaced = false;
        for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            // Si event ne se chevauche pas avec le dernier event de la colonne
            // alors on peut l’ajouter à cette colonne.
            if (!isOverlapping(event, col[col.length - 1])) {
                col.push(event);
                isPlaced = true;
                break;
            }
        }
        // Sinon on ajoute une nouvelle colonne
        if (!isPlaced) {
            columns.push([event]);
        }

        // Mise à jour du end time le plus tardif
        const endTime = startTime + event.duration;
        if (lastHighestEndTime === null || endTime > lastHighestEndTime) {
            lastHighestEndTime = endTime;
        }
    }

    // Si reste des colonnes après la boucle, on les finalise
    if (columns.length > 0) {
        const groupedColumns = groupEvents(columns, containerWidth, containerHeight);
        result.push(...groupedColumns.flat());
    }

    return result;
}

function isOverlapping(a: Event, b: Event) {
    if (a.id === b.id) return false;
    const startA = dateToMinute(a.start), endA = startA + a.duration;
    const startB = dateToMinute(b.start), endB = startB + b.duration;
    return !(endA <= startB || startA >= endB);
}

export function displayTime(start: Date, duration: number) {
    const startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(start.getTime() + duration * 60000);
    const endTimeString = endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${startTime} à ${endTimeString}`;
}

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