import { Event } from '../../models/Event';
import { dateToMinute } from '../EventUtils';
import { displayTime } from '../EventUtils';
import { groupOverlappingEvents } from '../EventUtils';

describe('EventUtils', () => {
  describe('displayTime', () => {
    it('devrait formater correctement le temps', () => {
      const start = new Date(2024, 0, 1, 9, 30);
      const duration = 60;
      expect(displayTime(start, duration)).toBe('09:30 à 10:30');
    });
  });

  describe('dateToMinute', () => {
    it('devrait convertir une date en minutes depuis minuit', () => {
      const date = new Date(2024, 0, 1, 9, 30);
      expect(dateToMinute(date)).toBe(570); // 9 * 60 + 30
    });
  });

  describe('groupOverlappingEvents', () => {
    it('devrait grouper correctement les événements qui se chevauchent', () => {
      const events: Event[] = [
        {
          id: 1,
          start: new Date(2024, 0, 1, 9, 0),
          duration: 60,
          top: 0,
          height: 0,
          width: 0,
          left: 0,
          backgroundColor: {
            color: '',
            darkerColor: ''
          }
        },
        {
          id: 2,
          start: new Date(2024, 0, 1, 9, 30),
          duration: 60,
          top: 0,
          height: 0,
          width: 0,
          left: 0,
          backgroundColor: {
            color: '',
            darkerColor: ''
          }
        }
      ];

      const result = groupOverlappingEvents(events, 800, 600);
      expect(result).toHaveLength(2);
      expect(result[0].width).toBeLessThan(800);
    });
  });
});