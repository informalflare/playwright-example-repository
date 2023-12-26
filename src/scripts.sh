DOCKER_IMAGE='mcr.microsoft.com/playwright:v1.40.0-jammy'

function runTests() {
  echo "RunTests"
      if argListContains --update; then
        printf "Updating visual snapshots"
        docker run -v "$PWD":/folder --network=host -w /folder -it --rm --ipc=host $DOCKER_IMAGE /bin/bash -c "npm ci && npx playwright test --config src/visual.config.ts"
      elif argListContains --run; then
        printf "Running visual tests might take some time \n"
        docker run -v "$PWD":/folder --network=host -w /folder -it --rm --ipc=host $DOCKER_IMAGE  /bin/bash -c "npm ci && npx playwright test --config src/visual.config.ts"
      elif argListContains --cicd; then
        printf "Running visual tests might take some time \n"
        docker run -v "$PWD":/folder --network=host -w /folder -it --rm --ipc=host $DOCKER_IMAGE  /bin/bash -c "npm ci && npx playwright install && npx playwright test --config ci-cd-poc/ci-cd.config.ts"
      fi
}

function argListContains() {
  arg=$1
  if [[ " ${BASH_ARGV[*]} " == *"${arg}"* ]]
  then
    return
  fi
  false
}

runTests