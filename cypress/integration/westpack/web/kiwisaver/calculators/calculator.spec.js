/// <reference types="Cypress" />

/**
 * testing the kiwisaver calculator functionality
 * @author Winston Nolan <winston.nolan@gmail.com>
 */
describe('testing the kiwisaver calculator functionality', () => {
  // vars
  const viewports = Cypress.config('viewports')
  const url = Cypress.env('baseUrl') ?? Cypress.config('restApiUrl')
  const fixture = require('../../../../../fixtures/westpack/web/kiwisaver/calculators/calculators.json')

  let iframeSelector = fixture['required-dom-elements']['iframe']['selector']
  let formGroupFieldsSelector = fixture['required-dom-elements']['form-group-fields']['selector']
  let formGroupFieldsOptions = fixture['required-dom-elements']['form-group-fields']['fields']
  let formGroupFieldInfoSelector = fixture['required-dom-elements']['form-group-fields']['fields-info']['selector']

  /**
   * this will execture before we run any of our tests
   */
  before('setup test environment', () => {
    // set desktop view
    // TODO: cover other viewports
    cy.viewport(viewports['desktop']['macbook-15'])
  })

  describe('navigation', () => {
    it('load the site', () => {
      cy.visit(url)
    })

    describe('navigates to the calculator', () => {
      it('trigger navigational menu', () => {
        let kiwisaverMenuItem = fixture['navigation']['kiwisaver-menu-link']['selector']
        cy
          .get(kiwisaverMenuItem)
          .trigger('mouseover')
      })

      it('click menu item', () => {
        let kiwisaverCalculatorsButton = fixture['navigation']['kiwisaver-calculators']['selector']
        cy
          .get(kiwisaverCalculatorsButton)
          .click()
      })

      it('click calculators button', () => {
        let kiwisaverSchemeRetirementCalculatorButton = fixture['navigation']['kiwisaver-scheme-retirement-calculator']['selector']
        let kiwisaverSchemeRetirementCalculatorButtonContent = fixture['navigation']['kiwisaver-scheme-retirement-calculator']['content']
        cy
          .get(kiwisaverSchemeRetirementCalculatorButton)
          .contains(kiwisaverSchemeRetirementCalculatorButtonContent)
          .click()
      })
      
    })
  })

  describe('execute tests', () => {
    /**
     * Test User Story 1
     * 
     * Acceptance Criteria
     * KiwiSaver Retirement Calculator all fields in the calculator must have
     * the information icon present
     * 
     * Given User Clicks information icon besides Current age the message “This calculator has an age
     * limit of 64 years old as you need to be under the age of 65 to join KiwiSaver.” is displayed below
     * the current age field.
     */
    describe('Test User Story 1', () => {
      /**
       * Verify Current Age message
       */
      it('verify current age info message', () => { 
        // get an iframe containing the form, set it as a re-usable alias
        cy.iframe(iframeSelector).as('iframe')

        // get our age field, then it's info button, then click the info button
        cy.get('@iframe')
          .find(formGroupFieldsOptions['current-age']['selector'])
          .find(formGroupFieldInfoSelector)
          .click()
        
        // get the info message and validate
        cy.get('@iframe')
          .find(formGroupFieldsOptions['current-age']['selector'])
          .find(formGroupFieldsOptions['current-age']['info-message']['selector'])
          .should('contain', formGroupFieldsOptions['current-age']['info-message']['content'])
      })
      
      /**
       * KiwiSaver Retirement Calculator all fields in the calculator must have
       * the information icon present
       */
      it('test all form groups have information icon present', () => {
        // get an iframe containing the form, set it as a re-usable alias
        cy.iframe(iframeSelector).as('iframe')
        cy.get('@iframe')
          .find(formGroupFieldsSelector)
          .find(formGroupFieldsOptions['current-age']['info-message']['selector'])
          .should('have.length.greaterThan', 0)
      })
    })

    /**
     * Test User Story 2
     * 
     * Acceptance Criteria
     * Calculation 1: User whose Current age is 30 is Employed @ a Salary 82000 p/a, contributes to
     * KiwiSaver @ 4% and chooses a Defensive risk profile can calculate his projected balances
     * at retirement.
     * 
     * Calculation 2: User whose current aged 45 is Self-employed, current KiwiSaver balance is $100000,
     * voluntary contributes $90 fortnightly and chooses Conservative risk profile with saving
     * goals requirement of $290000 can calculate his projected balances at retirement.
     * 
     * Calculation 3: User whose current aged 55 is not employed, current KiwiSaver balance is $140000,
     * voluntary contributes $10 annually and chooses Balanced risk profile with saving goals
     * requirement of $200000 is able to calculate his projected balances at retirement.
     */
    describe('Test User Story 2', () => {
      it('Calculation 1', () => {
        // clear current calculator settings
        cy.reload()
        // get an iframe containing the form, set it as a re-usable alias
        cy.iframe(iframeSelector).as('iframe')

        // age
        cy.get('@iframe')
          .find(formGroupFieldsOptions['current-age']['selector'])
          .find('input')
          .click()
          .type('30')

        // employment status
        cy.get('@iframe')
          .find(formGroupFieldsOptions['employment-status']['selector'])
          .find('.select-control')
          .click()
          .contains('Employed')
          .click()
        
        // salary
        cy.get('@iframe')
          .find(formGroupFieldsOptions['salary-or-wages']['selector'])
          .find('input')
          .click()
          .type('82000')

        // member contribution 
        cy.get('@iframe')
          .find(formGroupFieldsOptions['member-contribution']['selector'])
          .contains('label', '4%')
          .find('input')
          .click()

        // risk profile
        cy.get('@iframe')
          .find(formGroupFieldsOptions['risk-profile']['selector'])
          .contains('label', 'Defensive')
          .find('input')
          .click()

        // kiwi saver projections
        cy.get('@iframe')
          .find('.field-group-set')
          .contains('button', 'View your KiwiSaver retirement projections')
          .click()

        // assert
        cy.get('@iframe')
          .find('.results-field-group-set')
          .should((result) => {
            expect(result).to.be.visible
            expect(result).to.contain('At age 65, your KiwiSaver balance is estimated to be')
            expect(result.find('.results-graph')).to.be.visible
          })


      })

      it('Calculation 2', () => {
        // clear current calculator settings
        cy.reload()
        // get an iframe containing the form, set it as a re-usable alias
        cy.iframe(iframeSelector).as('iframe')

        // age
        cy.get('@iframe')
          .find(formGroupFieldsOptions['current-age']['selector'])
          .find('input')
          .click()
          .type('45')
 
        // employment status
        cy.get('@iframe')
          .find(formGroupFieldsOptions['employment-status']['selector'])
          .find('.select-control')
          .click()
          .contains('Self-employed')
          .click()

        // current kiwisaver balance 
        cy.get('@iframe')
          .find(formGroupFieldsOptions['current-kiwisaver-balance']['selector'])
          .find('input')
          .click()
          .type('100000')

        // voluntary contributions
        cy.get('@iframe')
          .find(formGroupFieldsOptions['voluntary-contributions']['selector'])
          .find('input')
          .click()
          .type('90')

        // voluntary contributions frequency
        cy.get('@iframe')
          .find(formGroupFieldsOptions['voluntary-contributions']['selector'])
          .find('.select-control')
          .click()
          .contains('Fortnightly')
          .click()

        // risk profile
        cy.get('@iframe')
          .find(formGroupFieldsOptions['risk-profile']['selector'])
          .contains('label', 'Conservative')
          .find('input')
          .click()

        // savings goal at retirement
        cy.get('@iframe')
          .find(formGroupFieldsOptions['savings-goal']['selector'])
          .find('input')
          .click()
          .type('290000')

        // view kiwi saver projections
        cy.get('@iframe')
          .find('.field-group-set')
          .contains('button', 'View your KiwiSaver retirement projections')
          .click()

        // assert
        cy.get('@iframe')
          .find('.results-field-group-set')
          .should((result) => {
            expect(result).to.be.visible
            expect(result).to.contain('At age 65, your KiwiSaver balance is estimated to be')
            expect(result.find('.results-graph')).to.be.visible
          })
        

      })

      it('Calculation 3', () => {
        // clear current calculator settings
        cy.reload()
        // get an iframe containing the form, set it as a re-usable alias
        cy.iframe(iframeSelector).as('iframe')

        // age
        cy.get('@iframe')
          .find('[label="Current age"]')
          .find('input')
          .click()
          .type('55')

        // employment status
        cy.get('@iframe')
          .find(formGroupFieldsOptions['employment-status']['selector'])
          .find('.select-control')
          .click()
          .contains('Not employed')
          .click()

        // current kiwisaver balance 
        cy.get('@iframe')
          .find(formGroupFieldsOptions['current-kiwisaver-balance']['selector'])
          .find('input')
          .click()
          .type('140000')

        // voluntary contributions
        cy.get('@iframe')
          .find(formGroupFieldsOptions['voluntary-contributions']['selector'])
          .find('input')
          .click()
          .type('10')

        // voluntary contributions frequency
        cy.get('@iframe')
          .find(formGroupFieldsOptions['voluntary-contributions']['selector'])
          .find('.select-control')
          .click()
          .contains('Annually')
          .click()

        // risk profile
        cy.get('@iframe')
          .find(formGroupFieldsOptions['risk-profile']['selector'])
          .contains('label', 'Balanced')
          .find('input')
          .click()

        // savings goal at retirement
        cy.get('@iframe')
          .find(formGroupFieldsOptions['savings-goal']['selector'])
          .find('input')
          .click()
          .type('400000')

        // view kiwi saver projections
        cy.get('@iframe')
          .find('.field-group-set')
          .contains('button', 'View your KiwiSaver retirement projections')
          .click()

        // assert
        cy.get('@iframe')
          .find('.results-field-group-set')
          .should((result) => {
            expect(result).to.be.visible
            expect(result).to.contain('At age 65, your KiwiSaver balance is estimated to be')
            expect(result.find('.results-graph')).to.be.visible
          })

      })

    })
  })
})

