## Installation

- Preconditions: You have `node` and `npm` installed.
- run `npm install` to download all the needed libraries
- run `npx playwright install` this is needed to download the browser binaries.

## To run the tests
- `npm run e2e` to run UI tests
- `npm run e2e-api` to run API tests
- `npm run format` to format the code

## IMPORTANT 
- Step-by-step tutorial for better understanding can be found `ui/specs/tutorial-example.spec.ts`
- It contains a ton of comments/links/references

## Project structure:

- NOTE: 
- Strongly recommended to go through `ui/specs/tutorial-example.spec.ts` to understand the structure better.

# UI 
- `npm run e2e` to run UI tests
- specs - test cases and suits
- po - Page Objects and PageElements
- data - holds the test related data
- snapshots - baseline screenshots for 
- utils

# API 
- `npm run e2e-api` to run API tests
- specs - test cases and suits
- services - your back end services on the portals ( should usually contain endpoint/controllers/helpers/schema-validators)

# Visual testing 
- Preconditions: Docker is installed and running.
- `npm run vvisual -- --run` to run the visual tests locally
- `npm run vvisual -- --update` to update snapshots

//TODO add accessibility validator.

