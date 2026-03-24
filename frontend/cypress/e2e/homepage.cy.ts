describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the homepage', () => {
    cy.contains('Architectural Excellence').should('be.visible')
  })

  it('should display featured projects section', () => {
    cy.contains('Featured Projects').should('be.visible')
  })

  it('should display services section', () => {
    cy.contains('Our Services').should('be.visible')
  })

  it('should have clickable project cards', () => {
    cy.get('a[href*="/projects/"]').should('exist')
  })

  it('should navigate to project detail page when clicking a project card', () => {
    cy.get('a[href*="/projects/"]').first().click()
    cy.url().should('include', '/projects/')
  })

  it('should have clickable service cards', () => {
    cy.get('a[href*="/services/"]').should('exist')
  })

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport('iphone-x')
    cy.contains('Architectural Excellence').should('be.visible')

    // Test tablet viewport
    cy.viewport('ipad-2')
    cy.contains('Architectural Excellence').should('be.visible')

    // Test desktop viewport
    cy.viewport(1920, 1080)
    cy.contains('Architectural Excellence').should('be.visible')
  })
})

// Made with Bob
