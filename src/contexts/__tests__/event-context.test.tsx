import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventProvider, useEvents } from '../event-context';
import { Event } from '../../models/Event';

jest.mock('../../data/input.json', () => ([
  { id: 1, start: "09:00", duration: 60 },
  { id: 2, start: "09:30", duration: 30 },
  { id: 3, start: "10:00", duration: 45 }
]));

const TestComponent = () => {
  const { events, sortEvents } = useEvents();
  return (
    <div>
      <button onClick={sortEvents} data-testid="sort-button">Trier</button>
      <div data-testid="events-count">{events.length}</div>
      {events.map((event: Event) => (
        <div key={event.id} data-testid={`event-${event.id}`}>
          {`${event.start.getHours()}:${String(event.start.getMinutes()).padStart(2, '0')} - ${event.duration}min`}
        </div>
      ))}
    </div>
  );
};

describe('EventContext', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <EventProvider>
        {component}
      </EventProvider>
    );
  };

  it('devrait fournir les événements initiaux', () => {
    renderWithProvider(<TestComponent />);

    expect(screen.getByTestId('events-count')).toHaveTextContent('3');
    expect(screen.getByTestId('event-1')).toHaveTextContent('9:00 - 60min');
    expect(screen.getByTestId('event-2')).toHaveTextContent('9:30 - 30min');
    expect(screen.getByTestId('event-3')).toHaveTextContent('10:00 - 45min');
  });

  it('devrait trier les événements correctement', () => {
    renderWithProvider(<TestComponent />);

    // Clic sur le bouton de tri
    act(() => {
      screen.getByTestId('sort-button').click();
    });

    const events = screen.getAllByTestId(/^event-/);
    expect(events[0]).toHaveTextContent('9:00');
    expect(events[1]).toHaveTextContent('9:30');
    expect(events[2]).toHaveTextContent('10:00');
  });

  it('devrait lever une erreur si useEvents est utilisé hors du Provider', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => { });

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useEvents must be used within an EventProvider');

    consoleSpy.mockRestore();
  });

  it('devrait maintenir l\'état entre les rendus', () => {
    const { rerender } = renderWithProvider(<TestComponent />);

    expect(screen.getByTestId('events-count')).toHaveTextContent('3');

    rerender(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    expect(screen.getByTestId('events-count')).toHaveTextContent('3');
  });

  it('devrait trier les événements par heure, minutes et durée', () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByTestId('sort-button').click();
    });

    const events = screen.getAllByTestId(/^event-/);

    expect(events[0]).toHaveTextContent('9:00');
    expect(events[1]).toHaveTextContent('9:30');
    expect(events[2]).toHaveTextContent('10:00');
  });
});