### E2E UI tests

#### Structure
We aim to use page models. These are a simple abstraction of the UI to reduce duplication in the
tests and speed UI and corresponding test refactoring. Not all tests use page models at the time of
writing, but all new tests should. The rule you should use is this: if you find yourself writing a
selector, you should instead use an existing page model (and extend it if necessary), or if none
exists for your current test, create a page model and place your selector there.

References for those unfamiliar with page models:
- https://testcafe.io/documentation/402826/guides/concepts/page-model#why-use-page-model
- https://github.com/SeleniumHQ/selenium/wiki/PageObjects
- https://martinfowler.com/bliki/PageObject.html

### Setup

#### Run docker test harness
In the `on-premise-deploy/docker-compose` directory:
```sh
docker-compose up
```
#### Install integration test npm dependencies
In the `ui-tests/tests` directory:
```sh
npm ci
```

### Run tests
In the `ui-tests/tests` directory:
```sh
npm run test
```

#### View results
In the `ui-tests/tests` directory:
```sh
$BROWSER results.html
```

#### Run a single test
```sh
PM4ML_ENDPOINT="http://localhost:8081" npm run test -- -t 'name of test'
```
E.g., for one of the login tests:
```sh
PM4ML_ENDPOINT="http://localhost:8081" npm run test -- -t 'Log in with valid credentials'
```

You can change `PM4ML_ENDPOINT` to any url if you're testing against a deployment.
#### With a different browser
```sh
BROWSER_TCAFE=chromium npm run test
# or
BROWSER_TCAFE=firefox npm run test
```
