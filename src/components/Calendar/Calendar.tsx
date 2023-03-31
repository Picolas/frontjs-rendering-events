import EventService from "../../services/EventService";
import Event from "../../models/Event";

function Calendar() {

    const events: Event[] = EventService.getInstance().getEvents();
    // sort events by start and duration
    EventService.getInstance().sortEvents(events);

    return (
    <div>
      <h1>Calendar</h1>
        
        {events.map((event: Event) => (
                <div key={event.id} >
                    <p>{event.start.toTimeString()}</p>
                    <p>{event.duration}</p>
                </div>
            )
        )}

    </div>
  )
}

export default Calendar