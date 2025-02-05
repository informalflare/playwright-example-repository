## Installation

Preconditions: You have `node` and `npm` installed.
run `npm install` to download all the needed libraries

## To run the tests

`npm run e2e` to run UI tests
`npm run api` to run API tests (make sure you have .env created in the root folder)
`npm run format` to format the code

## Test Cases location:

`tests/ui/specs`
`tests/api/specs`

## Project structure:

NOTE: Strongly recommended to go through `tests/ui/examples/TUTORIAL.spec.ts` to understand the structure better.

# UI
- po - Page Objects and PageElements
- data - holds the test related data
- snapshots - baseline screenshots for visual tests (docs in progress)
- utils

# Fixtures
- Contain test runners for API, UI, Settings