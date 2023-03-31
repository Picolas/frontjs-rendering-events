import Event from "../../models/Event";
import {dateToMinute} from "../utils";

export function calculateEventPosition(events: Event[], event: Event) {
    const overlappingEvents = findOverlappingEvents(events, event);

    const maxWidth = 100;
    const width = maxWidth / overlappingEvents.length;

    const index = overlappingEvents.findIndex((e) => e.id === event.id);
    const left = index * width;

    return { left, width };
}

export function findOverlappingEvents(events: Event[], targetEvent: Event): Event[] {
    const targetStart = dateToMinute(targetEvent.start);
    const targetEnd = targetStart + targetEvent.duration;

    return events.filter((event: Event) => {
        const eventStart = dateToMinute(event.start);
        const eventEnd = eventStart + event.duration;
        return (
            (eventStart >= targetStart && eventStart < targetEnd) ||
            (eventEnd > targetStart && eventEnd <= targetEnd) ||
            (eventStart < targetStart && eventEnd > targetEnd)
        );
    });
}

export function displayTime(start: Date, duration: number) {
    const startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(start.getTime() + duration * 60000);
    const endTimeString = endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${startTime} à ${endTimeString}`;
}