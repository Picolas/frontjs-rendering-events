import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Calendar } from '../Calendar/Calendar';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useEvents } from '../../contexts/EventContext';

jest.mock('../../hooks/useWindowSize', () => ({
  useWindowSize: jest.fn()
}));

jest.mock('../../contexts/EventContext', () => ({
  useEvents: jest.fn()
}));

jest.mock('../EventsList/EventsList', () => ({
  EventsList: ({ events, containerWidth, containerHeight }: any) => (
    <div data-testid="events-list">
      <span data-testid="events-list-width">Width: {containerWidth}</span>
      <span data-testid="events-list-height">Height: {containerHeight}</span>
      <span data-testid="events-list-count">Events: {events.length}</span>
    </div>
  )
}));

jest.mock('../HourLabels/HourLabels', () => ({
  HourLabels: ({ containerHeight }: any) => (
    <div data-testid="hour-labels">
      <span data-testid="hour-labels-height">Height: {containerHeight}</span>
    </div>
  )
}));

describe('Calendar', () => {
  const mockEvents = [
    { id: 1, start: new Date(), duration: 60 },
    { id: 2, start: new Date(), duration: 30 }
  ];

  const mockSortEvents = jest.fn();
  let mockWindowSize = { width: 1000, height: 800 };

  beforeEach(() => {
    jest.clearAllMocks();
    mockWindowSize = { width: 1000, height: 800 };

    (useWindowSize as jest.Mock).mockImplementation(() => mockWindowSize);
    (useEvents as jest.Mock).mockReturnValue({
      events: mockEvents,
      sortEvents: mockSortEvents
    });
  });

  it('devrait réagir aux changements de dimensions de la fenêtre', () => {
    const { rerender } = render(<Calendar key="initial" />);

    expect(screen.getByTestId('events-list-width')).toHaveTextContent('Width: 1000');
    expect(screen.getByTestId('events-list-height')).toHaveTextContent('Height: 800');

    mockWindowSize = { width: 800, height: 600 };

    rerender(<Calendar key="updated" />);

    expect(screen.getByTestId('events-list-width')).toHaveTextContent('Width: 800');
    expect(screen.getByTestId('events-list-height')).toHaveTextContent('Height: 600');
  });

  it('devrait rendre les composants EventsList et HourLabels', () => {
    render(<Calendar />);

    expect(screen.getByTestId('events-list')).toBeInTheDocument();
    expect(screen.getByTestId('hour-labels')).toBeInTheDocument();
  });

  it('devrait passer les bonnes props aux composants enfants', () => {
    render(<Calendar />);

    expect(screen.getByTestId('events-list-width')).toHaveTextContent('Width: 1000');
    expect(screen.getByTestId('events-list-height')).toHaveTextContent('Height: 800');
    expect(screen.getByTestId('events-list-count')).toHaveTextContent('Events: 2');
  });

  it('devrait appeler sortEvents au montage', () => {
    render(<Calendar />);
    expect(mockSortEvents).toHaveBeenCalledTimes(1);
  });

  it('devrait avoir le bon style pour le conteneur principal', () => {
    render(<Calendar />);

    const container = screen.getByTestId('events-list').parentElement?.parentElement;
    expect(container).toHaveStyle({
      display: 'grid',
      gridTemplateColumns: 'auto 1fr'
    });
  });
});