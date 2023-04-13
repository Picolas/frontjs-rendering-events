import EventService from "../../services/EventService";
import Event from "../../models/Event";
import {useEffect, useMemo, useState} from "react";
import EventList from "../EventList/EventList";
import HourLabels from "../HourLabels/HourLabels";

function Calendar() {

    const [containerWidth, setContainerWidth] = useState(window.innerWidth);
    const [containerHeight, setContainerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setContainerWidth(window.innerWidth);
            setContainerHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const events: Event[] = EventService.getInstance().getEvents();
    // sort events by start and duration
    // use memo to avoid unnecessary re-rendering
    useMemo(() => {
        EventService.getInstance().sortEvents(events);
    }, [events]);

    return (
        <div className="calendar-day" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <HourLabels containerHeight={containerHeight} />

            <div style={{ position: 'relative' }}>
                <EventList
                    events={events}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                />
            </div>
        </div>
  )
}

export default Calendar