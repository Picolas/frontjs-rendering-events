import { memo, useEffect } from "react";
import { EventsList } from "../events-list/events-list";
import { HourLabels } from "../hour-labels/hour-labels";
import { useWindowSize } from "../../hooks/use-window-size";
import { useEvents } from "../../contexts/event-context";

export const Calendar = memo(() => {
    const { width: containerWidth, height: containerHeight } = useWindowSize();
    const { events, sortEvents } = useEvents();

    useEffect(() => {
        sortEvents();
    }, [sortEvents]);

    return (
        <div className="calendar-day" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <HourLabels containerHeight={containerHeight} />

            <div style={{ position: 'relative' }}>
                <EventsList
                    events={events}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                />
            </div>
        </div>
    )
})

Calendar.displayName = 'Calendar';