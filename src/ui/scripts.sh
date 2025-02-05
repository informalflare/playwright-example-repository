DOCKER_IMAGE='mcr.microsoft.com/playwright:v1.49.1-noble'

function runTests() {
  echo "RunTests"
      if argListContains --update; then
        printf "Updating visual snapshots"
        docker run -v "$PWD":/folder --network=host -w /folder -it --rm --ipc=host $DOCKER_IMAGE /bin/bash -c "npm ci && npx playwright test --project=visual --update-snapshots"
      elif argListContains --run; then
        printf "Running visual tests might take some time \n"
        docker run -v "$PWD":/folder --network=host -w /folder -it --rm --ipc=host $DOCKER_IMAGE  /bin/bash -c "npm ci && npx playwright test --project=visual"
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