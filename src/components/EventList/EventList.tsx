import Event from "../../models/Event";
import EventComponent from "../Event/EventComponent";
import {groupOverlappingEvents} from "../../utils/Event/EventUtils";
import {useMemo} from "react";

interface EventsListProps {
    events: Event[];
    containerWidth: number;
    containerHeight: number;
}

function EventsList({ events, containerWidth, containerHeight }: EventsListProps) {

    const columns: Event[][] = useMemo(
        () => groupOverlappingEvents(events, containerWidth, containerHeight),
        [events, containerWidth, containerHeight]
    );

    return (
        <div>
            {columns.flat().map((event: Event) => (
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