## To run the tests use 
`npx run e2e` or `npx playwright test`

## Tutorial spec 

Go through `src/sutorial-example.spec.ts` (all the comments should be there)


## folder structure
- specs - a place where your tests should be placed
- po - Page Objects and Element Objects should be here
- data - your REPEATABLE tests data that is used in the tests should be stored here
- utils - folder for any helper classes you might need
- interfaces - should hold any repeatable interfaces(types)
- fixtures - Page fixtures or configuration fixtures etc.

## Visual notes:
Docker should be installed and running.
`npm run visual -- --run`

# Main Goal:
- To avoid screenshot differences caused by various OS(windows/mac/linux), Browser versions etc.
- Run visual tests inside a docker container locally. (on ci/cd it will be in a container by default) 
- baselines will be stored in `src/snapshots`
- IMPORTANT: USE the same docker container locally and on CI/CD
- Notes: To make it stable and cross-platform we need to install node modules inside the docker container
- This means you will have to reinstall the dependencies