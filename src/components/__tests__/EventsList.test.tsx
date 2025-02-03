import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventsList } from '../EventsList/EventsList';
import { Event } from '../../models/Event';
import { groupOverlappingEvents } from '../../utils/EventUtils';

// Mock des modules
jest.mock('../../utils/EventUtils', () => ({
  groupOverlappingEvents: jest.fn().mockImplementation((events) => events)
}));

jest.mock('../Event/Event', () => ({
  Event: ({ id, start, duration }: any) => (
    <div data-testid={`event-${id}`}>
      {`${start.getHours()}:${String(start.getMinutes()).padStart(2, '0')} - ${duration}min`}
    </div>
  )
}));

describe('EventsList', () => {
  const mockEvents: Event[] = [
    {
      id: 1,
      start: new Date('2024-03-20T09:00:00'),
      duration: 60,
      top: 0,
      height: 100,
      width: 200,
      left: 0,
      backgroundColor: {
        color: '#E2ECF5',
        darkerColor: '#B3D1E8'
      }
    },
    {
      id: 2,
      start: new Date('2024-03-20T10:00:00'),
      duration: 30,
      top: 100,
      height: 50,
      width: 200,
      left: 0,
      backgroundColor: {
        color: '#E2ECF5',
        darkerColor: '#B3D1E8'
      }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    document.querySelector = jest.fn().mockImplementation((selector) => {
      if (selector === '.hour-labels') {
        return { clientWidth: 100 };
      }
      return null;
    });
  });

  it('devrait rendre tous les événements', () => {
    const { groupOverlappingEvents } = require('../../utils/EventUtils');
    groupOverlappingEvents.mockReturnValueOnce(mockEvents);

    render(
      <EventsList
        events={mockEvents}
        containerWidth={1000}
        containerHeight={800}
      />
    );

    expect(screen.getByTestId('event-1')).toBeInTheDocument();
    expect(screen.getByTestId('event-2')).toBeInTheDocument();
  });

  it('devrait appeler groupOverlappingEvents avec les bonnes dimensions', () => {
    const { groupOverlappingEvents } = require('../../utils/EventUtils');
    groupOverlappingEvents.mockReturnValueOnce(mockEvents);

    render(
      <EventsList
        events={mockEvents}
        containerWidth={1000}
        containerHeight={800}
      />
    );

    expect(groupOverlappingEvents).toHaveBeenCalledWith(
      mockEvents,
      900, // 1000 - 100 (hourLabelsWidth)
      800
    );
  });

  it('devrait mémoriser le résultat de groupOverlappingEvents', () => {
    const { groupOverlappingEvents } = require('../../utils/EventUtils');
    groupOverlappingEvents.mockReturnValue(mockEvents);

    const { rerender } = render(
      <EventsList
        events={mockEvents}
        containerWidth={1000}
        containerHeight={800}
      />
    );

    expect(groupOverlappingEvents).toHaveBeenCalledTimes(1);

    rerender(
      <EventsList
        events={mockEvents}
        containerWidth={1000}
        containerHeight={800}
      />
    );

    expect(groupOverlappingEvents).toHaveBeenCalledTimes(1);
  });

  it('devrait recalculer quand les dimensions changent', () => {
    const { groupOverlappingEvents } = require('../../utils/EventUtils');
    groupOverlappingEvents.mockReturnValue(mockEvents);

    const { rerender } = render(
      <EventsList
        events={mockEvents}
        containerWidth={1000}
        containerHeight={800}
      />
    );

    expect(groupOverlappingEvents).toHaveBeenCalledTimes(1);

    rerender(
      <EventsList
        events={mockEvents}
        containerWidth={800}
        containerHeight={600}
      />
    );

    expect(groupOverlappingEvents).toHaveBeenCalledTimes(2);
  });
});