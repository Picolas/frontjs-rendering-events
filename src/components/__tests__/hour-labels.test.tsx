import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HourLabels } from '../hour-labels/hour-labels';
import { DAY_START_HOUR, DAY_END_HOUR } from '../../constants/constants';

describe('HourLabels', () => {
  const containerHeight = 800;

  it('devrait rendre les étiquettes des heures correctement', () => {
    render(<HourLabels containerHeight={containerHeight} />);

    for (let hour = DAY_START_HOUR; hour <= DAY_END_HOUR - 1; hour++) {
      expect(screen.getByText(`${hour}:00`)).toBeInTheDocument();
    }
  });

  it('devrait avoir la bonne hauteur pour chaque étiquette', () => {
    render(<HourLabels containerHeight={containerHeight} />);

    const expectedHeight = containerHeight / ((DAY_END_HOUR - DAY_START_HOUR) * 2);
    const hourLabels = screen.getAllByRole('listitem');

    hourLabels.forEach(label => {
      expect(label).toHaveStyle({ height: `${expectedHeight}px` });
    });
  });

  it('devrait avoir des lignes pointillées pour les demi-heures', () => {
    render(<HourLabels containerHeight={containerHeight} />);

    const hourLines = screen.getAllByRole('listitem');
    const totalLines = (DAY_END_HOUR - DAY_START_HOUR) * 2;

    expect(hourLines).toHaveLength(totalLines);

    hourLines.forEach((line, index) => {
      const isHalfHour = index % 2 === 1;
      const dottedLine = line.querySelector('.dotted-line');

      expect(dottedLine).toHaveClass(isHalfHour ? 'half-hour-line' : 'hour-line');
    });
  });

  it('devrait avoir la classe hour-labels sur le conteneur', () => {
    render(<HourLabels containerHeight={containerHeight} />);

    const container = screen.getAllByRole('listitem')[0].parentElement;
    expect(container).toHaveClass('hour-labels');
  });

  it('devrait mettre à jour la hauteur quand containerHeight change', () => {
    const { rerender } = render(<HourLabels containerHeight={800} />);

    let expectedHeight = 800 / ((DAY_END_HOUR - DAY_START_HOUR) * 2);
    let hourLabels = screen.getAllByRole('listitem');

    hourLabels.forEach(label => {
      expect(label).toHaveStyle({ height: `${expectedHeight}px` });
    });

    rerender(<HourLabels containerHeight={600} />);

    expectedHeight = 600 / ((DAY_END_HOUR - DAY_START_HOUR) * 2);
    hourLabels = screen.getAllByRole('listitem');

    hourLabels.forEach(label => {
      expect(label).toHaveStyle({ height: `${expectedHeight}px` });
    });
  });
});