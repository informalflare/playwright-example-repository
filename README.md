## To run the tests use
`npx run e2e` 

## folder structure
- src/specs - a place where your Tests should be placed
- src/po - Page Objects and Element Objects should be here
- src/data - your REPEATABLE tests data that is used in the tests should be stored here
- src/utils - folder for any helper classes you might need
- src/interfaces - should hold any repeatable interfaces(types)
- src/fixtures - Page fixtures or configuration fixtures etc.

## Visual Testing:
Docker should be installed and running.
`npm run visual -- --run`

# Main Goal:
- To avoid screenshot differences caused by various OS(windows/mac/linux), Browser versions etc.
- Run visual tests inside a docker container locally. (on ci/cd it will be in a container by default)
- baselines will be stored in `src/snapshots`
- IMPORTANT: USE the same docker container locally and on CI/CD
- Notes: To make it stable and cross-platform we need to install node modules inside the docker container
- This means you will have to reinstall the dependencies
