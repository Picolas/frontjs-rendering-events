import Event from "../../models/Event";
import {dateToMinute, getRandomColor} from "../../utils/utils";
import EventComponent from "../Event/EventComponent";
import {addConflictsToGroup, checkOverlapping} from "../../utils/Event/EventUtils";
import {DAY_END_HOUR, DAY_START_HOUR} from "../../constants/constants";

interface EventsListProps {
    events: Event[];
    containerWidth: number;
    containerHeight: number;
}

function EventsList({ events, containerWidth, containerHeight }: EventsListProps) {

    const calendarStart = DAY_START_HOUR * 60; // 09h in minutes
    const calendarEnd = DAY_END_HOUR * 60; // 21h in minutes
    const calendarDuration = calendarEnd - calendarStart;

    function updateEvents(events: Event[]) {
        let eventsArray: Event[] = checkOverlapping(events);
        let eventsCopy: Event[] = [...eventsArray];

        for (let i = 0; i < eventsCopy.length; i++) {
            let event: Event = eventsCopy[i];
            event.backgroundColor = getRandomColor();
            event.height = (event.duration / calendarDuration) * containerHeight;
            event.top = ((dateToMinute(event.start) - calendarStart) / calendarDuration) * containerHeight;

            if (i > 0 && event.colsBefore.length > 0) {
                if (eventsCopy[i-1].column > 0) {
                    for (let j = 0; j < eventsCopy[i-1].column; j++) {
                        if (event.colsBefore.indexOf(i-(j+2)) === -1) {
                            event.column = eventsCopy[i-(j+2)].column;
                        }
                    }
                    if (typeof event.column === 'undefined') {
                        event.column = eventsCopy[i-1].column + 1;
                    }
                } else {
                    let column = 0;
                    for (let j=0; j < event.colsBefore.length; j++) {
                        if (eventsCopy[event.colsBefore[event.colsBefore.length-1-j]].column === column) {
                            column++;
                        }
                    }
                    event.column = column;
                }
            } else {
                event.column = 0;
            }
        }

        for(let i = 0; i < eventsCopy.length; i++) {
            eventsCopy[i].totalColumns = 0;
            if (eventsCopy[i].cols.length > 1) {
                let conflictGroup: number[] = [];
                let conflictGroupColumns: number[] = [];
                addConflictsToGroup(eventsCopy[i], eventsCopy, conflictGroup, conflictGroupColumns);
                eventsCopy[i].totalColumns = Math.max.apply(null, conflictGroupColumns);
            }
            eventsCopy[i].width = (100 / (eventsCopy[i].totalColumns + 1));
            eventsCopy[i].left = (100 / (eventsCopy[i].totalColumns + 1) * eventsCopy[i].column);
        }

        return eventsCopy;
    }

    events = updateEvents(events);

    return (
        <div>
            {events.map((event: Event) => (
                <EventComponent
                    key={event.id}
                    id={event.id}
                    start={event.start}
                    duration={event.duration}
                    top={event.top}
                    height={event.height}
                    left={event.left}
                    width={event.width}
                    backgroundColor={event.backgroundColor}
                />
            ))}
        </div>
    );
}

export default EventsList;