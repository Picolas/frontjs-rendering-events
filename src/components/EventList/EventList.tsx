import Event from "../../models/Event";
import {dateToMinute, getRandomColor} from "../../utils/utils";
import EventComponent from "../Event/EventComponent";
import {calculateEventPosition} from "../../utils/Event/EventUtils";
import {useMemo} from "react";

interface EventsListProps {
    events: Event[];
    containerWidth: number;
    containerHeight: number;
}

function EventsList({ events, containerWidth, containerHeight }: EventsListProps) {

    const calendarStart = 9 * 60; // 09h in minutes
    const calendarEnd = 21 * 60; // 21h in minutes
    const calendarDuration = calendarEnd - calendarStart;

    function calculateEventDimensions(event: Event) {
        const startTime = dateToMinute(event.start);
        const endTime = startTime + event.duration;
        const top = ((startTime - calendarStart) / calendarDuration) * containerHeight;
        const height = (event.duration / calendarDuration) * containerHeight;
        const { left, width } = calculateEventPosition(events, event);
        const backgroundColor = getRandomColor();

        return {
            id: event.id,
            start: event.start,
            duration: event.duration,
            top,
            height,
            left,
            width,
            backgroundColor,
        };
    }

    const parsedEvents = useMemo(
        () => events.map((event: Event) => calculateEventDimensions(event)),
        [events, containerHeight]
    );

    return (
        <div>
            {parsedEvents.map((event) => (
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