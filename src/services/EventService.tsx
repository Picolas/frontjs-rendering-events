import Event from "../models/Event";
import eventsJson from "../data/input.json";
import { assignLevels } from "../utils/Event/EventUtils";

class EventService {
    // singleton
    private static instance: EventService
    private events: Event[] = [];

    // singleton
    private constructor() {
        this.events = this.getEventsFromJson();
    }

    // singleton
    static getInstance(): EventService {
        if (!EventService.instance) {
            EventService.instance = new EventService()
        }
        return EventService.instance
    }

    // get events
    getEvents(): Event[] {
        return this.events;
    }

    // get events from input.json and then map them to Event objects
    getEventsFromJson(): Event[] {
        return eventsJson.map((event: any) => new Event(event.id, event.start, event.duration));
    }

    // set events
    setEvents(events: Event[]) {
        this.events = events;
    }

    // function to sort events by start and duration, if start hour is same, then check if minutes is same then sort by duration b - a to get bigger first, more duration first
    sortEvents(events: Event[]) {
        events.sort((a: Event, b: Event) => {
            if (a.start.getHours() === b.start.getHours()) {
                if (a.start.getMinutes() === b.start.getMinutes()) {
                    return b.duration - a.duration;
                }
                return a.start.getMinutes() - b.start.getMinutes();
            }
            return a.start.getHours() - b.start.getHours();
        });
    }

    assignLevels(events: Event[]) {
        assignLevels(events);
    }
}

export default EventService