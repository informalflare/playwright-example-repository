## Preconditions
- use the .env_example file to create an env file with credentials
- credentials should be correct

# How to run the api tests
`npm run e2e-api`

# Authentication and TOKENS
Tokens are gathered in `api/specs/global.api.setup.ts` and saved into the Environmental variables (.env file)
To switch between users (or logged In/Out state)
Please use `test.use({ extraHTTPHeaders: { Cookie: process.env.USER_A_TOKEN } });` in your test file or project.

# Overview of the structure:
```
api folder:

├── README.md                          | an overview of api part of the framework
├── api-client.ts                      | an entry point that provides access to controllers
├── api.config.ts                      | config with main settings like extraHeaders
├── services                           | folder with services of your app
│   ├── base-controller.ts             | common controller functionality lives here
│   └── booking                        | folder for booking service
│       ├── booking-controller.ts      | controller for the service with main api functions
│       ├── booking-endpoints.ts       | provider of endpoint URIs
│       ├── booking-helper.ts          | helper methods for booking service
│       ├── booking-types.ts           | interfaces/types of responses
│       ├── index.ts                   | index file
│       └── schemas                    | folder with api schemas for contract testing
└── specs                              | folder for test cases
    ├── example.spec.ts                | test case examples for booking service
    └── global.api.setup.ts            | global setup for api project
```

## How it works:

1. To run the test use `npm run e2e-api`

2. When the script is run the global setup will run first `global.api.setup.ts`
   It will perform an API call for authentication with credentials from .env file.
   After the authentication the token obtained will be used as `extraHTTPHeaders` in `api.config.ts`
   This allows us to run the following API calls as we are already authenticated.
3. The test are now triggered using the extra headers.
   You can override the extra headers if you have a test with unAuthenticated state with:
   `test.use({ extraHTTPHeaders: { Cookie: 'token=whatever' } });`
4. Main functionality is stored in the controller classes. Like in this case `booking-controller.ts` Functions represent the apis like `getBook`.
   Every function in the controller does few things:
    - Performs api call and returns the obtained response in correct type.
    - Checks the response for status code.
    - Compares the response against the ajv **Schema**. (contract test)
5. If the schema is not present `validateSchema()` function from `base-controller` will autogenerate if for you. (test will fail with a warning)
6. If you wish to disable the schema validation set .env variable to true
   `SKIP_SCHEMA_VALIDATION='false'`
7. By default, expected status is set to 200, but it can be passes as an argument.
   Note: use switch statement if the response type would be different.
