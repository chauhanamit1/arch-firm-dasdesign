/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login (example)
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/api/auth/local`,
    body: {
      identifier: email,
      password: password,
    },
  }).then((response) => {
    window.localStorage.setItem('jwt', response.body.jwt)
  })
})

// Custom command to check API health
Cypress.Commands.add('checkApiHealth', () => {
  cy.request(`${Cypress.env('API_URL')}/api/projects`).its('status').should('eq', 200)
})

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      checkApiHealth(): Chainable<void>
    }
  }
}

export {}

// Made with Bob
