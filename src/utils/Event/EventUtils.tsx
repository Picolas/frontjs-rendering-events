import Event from "../../models/Event";
import {dateToMinute} from "../utils";

export function checkOverlapping(events: Event[]) {
    events.forEach((event, indexI) => {
        events.forEach((otherEvent, indexJ) => {
            if(isOverlapping(event, otherEvent)) {
                event.cols.push(indexJ);
                if (indexI > indexJ) {
                    event.colsBefore.push(indexJ);
                }
            }
        });
    });
    return events;
}

export function isOverlapping(eventA: Event, eventB: Event) {
    const eventAStart = dateToMinute(eventA.start);
    const eventAEnd = eventAStart + eventA.duration;
    const eventBStart = dateToMinute(eventB.start);
    const eventBEnd = eventBStart + eventB.duration;

    return (
        eventAEnd > eventBStart && eventAStart < eventBEnd
    );
}

export function addConflictsToGroup(event: Event, eventsArray: Event[], conflictGroup: number[], conflictGroupColumns: number[]) {
    for (let k=0; k < event.cols.length; k++) {
        if (conflictGroup.indexOf(event.cols[k]) === -1) {
            conflictGroup.push(event.cols[k]);
            conflictGroupColumns.push(eventsArray[event.cols[k]].column);
            addConflictsToGroup(eventsArray[event.cols[k]], eventsArray, conflictGroup, conflictGroupColumns);
        }
    }
}

export function displayTime(start: Date, duration: number) {
    const startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(start.getTime() + duration * 60000);
    const endTimeString = endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${startTime} à ${endTimeString}`;
}