import { render, screen } from '@testing-library/react';
import { Event } from '../event/event';

describe('Event', () => {
  const defaultProps = {
    id: 1,
    start: new Date('2024-03-20T09:00:00'),
    duration: 60,
    top: 100,
    height: 120,
    width: 200,
    left: 50,
    backgroundColor: {
      color: '#E2ECF5',
      darkerColor: '#B3D1E8'
    }
  };

  it('renders with correct style properties', () => {
    render(<Event {...defaultProps} />);

    const eventElement = screen.getByText('09:00 à 10:00');
    const styles = window.getComputedStyle(eventElement);

    expect(eventElement).toBeInTheDocument();
    expect(eventElement).toHaveStyle({
      top: '100px',
      height: '120px',
      left: '50px',
      width: '200px',
      backgroundColor: '#E2ECF5',
      boxShadow: 'inset 0 0 0 2px #B3D1E8'
    });
  });

  it('displays correct time format', () => {
    render(<Event {...defaultProps} />);

    expect(screen.getByText('09:00 à 10:00')).toBeInTheDocument();
  });

  it('renders with different time and duration', () => {
    const props = {
      ...defaultProps,
      start: new Date('2024-03-20T14:30:00'),
      duration: 90
    };

    render(<Event {...props} />);

    expect(screen.getByText('14:30 à 16:00')).toBeInTheDocument();
  });
});