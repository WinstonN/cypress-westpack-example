/**
 * clear session storage & cookies before our tests start
 */
before('setup test environment', () => {
  // clear session storage
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })

  // clear local storage
  cy.window().then((win) => {
    win.localStorage.clear()
  })

  // clear cookies
  cy.clearCookies()
})

/**
 * do not clear local storage between tests runs (maintain state)
 * 
 * @param {*} keys 
 * @param {*} ls 
 * @param {*} rs 
 */
Cypress.LocalStorage.clear = function (keys, ls, rs) {};