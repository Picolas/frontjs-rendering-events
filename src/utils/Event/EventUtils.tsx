import Event from "../../models/Event";
import {dateToMinute, getRandomColor} from "../utils";
import {DAY_END_HOUR, DAY_START_HOUR} from "../../constants/constants";

export function groupEvents(columns: Event[][], containerWidth: number, containerHeight: number) {
    const n = columns.length;
    const calendarStart = DAY_START_HOUR * 60; // 09h in minutes
    const calendarEnd = DAY_END_HOUR * 60; // 21h in minutes
    const calendarDuration = calendarEnd - calendarStart;

    columns.forEach((column: Event[], i: number) => {
        let left = (i / n) * containerWidth;
        column.forEach((event: Event) => {
            const startTime = dateToMinute(event.start);
            event.left = left;
            event.top = ((startTime - calendarStart) / calendarDuration) * containerHeight;
            event.height = (event.duration / calendarDuration) * containerHeight;
            event.width = containerWidth * expendEvent(event, i, columns) / n;
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

export function groupOverlappingEvents(events: Event[], containerWidth: number, containerHeight: number) {

    let result: Event[][] = [];
    let columns: Event[][] = [];

    let lastHighestEndTime: number | null = 0;

    events.forEach((event, index) => {

        let startTime = dateToMinute(event.start);
        if (lastHighestEndTime !== null && startTime >= lastHighestEndTime) {
            columns = groupEvents(columns, containerWidth, containerHeight);
            result = result.concat(columns);
            columns = [];
            lastHighestEndTime = null;
        }

        let isPlaced = false;

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            if (!isOverlapping(event, column[column.length - 1])) {
                column.push(event);
                isPlaced = true;
                break;
            }
        }

        if (!isPlaced) {
            columns.push([event]);
        }

        const endTime = startTime + event.duration;
        if (lastHighestEndTime === null || lastHighestEndTime < endTime) {
            lastHighestEndTime = endTime;
        }

        if (columns.length === 0) {
            columns = groupEvents(columns, containerWidth, containerHeight);
            result = result.concat(columns);
        }
    });

    return result;
}

function isOverlapping(eventA: Event, eventB: Event) {
    if (eventA.id === eventB.id) return false;

    const startA = dateToMinute(eventA.start);
    const endA = startA + eventA.duration;
    const startB = dateToMinute(eventB.start);
    const endB = startB + eventB.duration;

    return endA > startB && startA < endB;
}

export function displayTime(start: Date, duration: number) {
    const startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(start.getTime() + duration * 60000);
    const endTimeString = endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${startTime} à ${endTimeString}`;
}