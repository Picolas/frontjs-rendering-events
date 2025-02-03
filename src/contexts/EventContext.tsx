import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { createEvent, Event } from '../models/Event';
import eventsJson from '../data/input.json';

interface EventContextType {
  events: Event[];
  setEvents: (events: Event[]) => void;
  sortEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(
    eventsJson.map((event) => createEvent(event.id, event.start, event.duration))
  );

  const sortEvents = useCallback(() => {
    setEvents(prevEvents => {
      const sortedEvents = [...prevEvents].sort((a: Event, b: Event) => {
        if (a.start.getHours() === b.start.getHours()) {
          if (a.start.getMinutes() === b.start.getMinutes()) {
            return b.duration - a.duration;
          }
          return a.start.getMinutes() - b.start.getMinutes();
        }
        return a.start.getHours() - b.start.getHours();
      });
      return sortedEvents;
    });
  }, []);

  return React.createElement(
    EventContext.Provider,
    { value: { events, setEvents, sortEvents } },
    children
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};