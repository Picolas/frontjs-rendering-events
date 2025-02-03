import { DAY_START_HOUR, DAY_END_HOUR } from '../../src/constants/constants';

describe('Calendar E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('.calendar-day', { timeout: 10000 }).should('exist');
  });

  it('devrait afficher le calendrier avec les bonnes heures', () => {
    for (let hour = DAY_START_HOUR; hour <= DAY_END_HOUR - 1; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      cy.contains(`${formattedHour}:00`).should('exist');
    }
  });

  it('devrait afficher les événements correctement', () => {
    cy.contains(/\d{2}:\d{2} à \d{2}:\d{2}/).should('exist');
  });

  it('devrait redimensionner les événements lors du changement de taille de fenêtre', () => {
    cy.contains(/\d{2}:\d{2} à \d{2}:\d{2}/).should('exist').then(($event) => {
      const initialWidth = $event.width();

      cy.viewport(800, 600);

      cy.contains(/\d{2}:\d{2} à \d{2}:\d{2}/).should(($newEvent) => {
        expect($newEvent.width()).not.to.equal(initialWidth);
      });
    });
  });

  it('devrait afficher les lignes de demi-heures', () => {
    cy.get('.hour-line').should('exist');
    cy.get('.half-hour-line').should('exist');
  });

  it('devrait afficher les événements qui se chevauchent correctement', () => {
    cy.contains(/\d{2}:\d{2} à \d{2}:\d{2}/).should('exist');

    cy.get('.calendar-day').within(() => {
      cy.contains(/\d{2}:\d{2} à \d{2}:\d{2}/).should('exist');
      cy.contains(/\d{2}:\d{2} à \d{2}:\d{2}/).should('exist');
    });
  });
});