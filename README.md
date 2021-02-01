# cypress-westpack-example
cypress.io test automation example for Westpack

# install cypress
https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements
```bash
npm init
npm install cypress --save-dev
```

# run cypress
## running cypress locally
```bash
./node_modules/cypress/bin/cypress open
```

## docker
You can run cypress, using docker, with one command

```bash
docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.3.0
```

The output should be
```bash
====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:    6.3.0                                                                              │
  │ Browser:    Electron 87 (headless)                                                             │
  │ Specs:      1 found (westpack/web/kiwisaver/calculators/calculator.spec.js)                    │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  westpack/web/kiwisaver/calculators/calculator.spec.js                           (1 of 1)


  testing the kiwisaver calculator functionality
    navigation
      ✓ load the site (5343ms)
      navigates to the calculator
        ✓ trigger navigational menu (389ms)
        ✓ click menu item (1727ms)
        ✓ click calculators button (2550ms)
    execute tests
      Test User Story 1
        1) verify current age info message
        ✓ test all form groups have information icon present (177ms)
      Test User Story 2
        ✓ Calculation 1 (4690ms)
        ✓ Calculation 2 (4894ms)
        ✓ Calculation 3 (5013ms)


  8 passing (38s)
  1 failing

  1) testing the kiwisaver calculator functionality
       execute tests
         Test User Story 1
           verify current age info message:
     AssertionError: Timed out retrying after 10000ms: expected '<div.field-message.message-info.ng-binding>' to contain 'This calculator has an age limit of 64 years old as you need to be under the age of 65 to join KiwiSaver.'
      at Context.eval (https://www.westpac.co.nz/__cypress/tests?p=cypress/integration/westpack/web/kiwisaver/calculators/calculator.spec.js:180:155)




  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        9                                                                                │
  │ Passing:      8                                                                                │
  │ Failing:      1                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  1                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     38 seconds                                                                       │
  │ Spec Ran:     westpack/web/kiwisaver/calculators/calculator.spec.js                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Screenshots)

  -  /e2e/cypress/artefacts/screenshots/westpack/web/kiwisaver/calculators/calculator     (1280x720)
     .spec.js/testing the kiwisaver calculator functionality -- execute tests -- Test
      User Story 1 -- verify current age info message (failed).png


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: /e2e/cypress/artefacts/videos/westpack/web/kiwisaver/calcul    (4 seconds)
                          ators/calculator.spec.js.mp4


====================================================================================================
```
If you experience any errors such as "no space left on device" you can run the below commands to clear up docker run time space. Then run the above command again

```bash
# get details about docker environment space
docker system df

# CAUTION: remove docker images
docker rmi $(docker images -a -q)

# CAUTION: remove docker volumes
docker volume rm $(docker volume ls -q)
```

# about the project structure
cypress.io can be used to test web sites, and api (both rest and graph)

This project has been setup for that purpose already

# about the tests
The tests have been structured in such a way that they only contain logic. All of the selectors have been abstracted away into a fixture file