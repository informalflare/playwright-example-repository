## Preconditions

- use the .env_example file to create an env file with credentials
- credentials should be correct

# How to run the api tests

`npm run e2e-api`

# Authentication and TOKENS

Tokens are gathered in `tests/api/global.api.setup.ts` and saved into the Environmental variables BOOKING_TOKEN (.env file)
This token is later set as a defaultHeader in the Booking controller.
To test 403 for not logged in state you would have to set Cookie Header in the request. (check Put Requests for booking tests)

# Overview of the structure:

```
api folder:

├── README.md
├── api-settings.ts                                 | File to store all the API related settings (can shadow env variables)
└── services                                        | Folder to store api services
    ├── base-controller.ts                          | Shares the common functionality within all contollers
    ├── booking                                     | folder (service name)
    │         ├── booking-controller.ts             | file when magic happens, does all the requests and basic validation
    │         ├── booking-step-helper.ts                 | Helpers related to specific service
    │         ├── booking-types.ts                  | Types to cast into (if needed)
    │         ├── index.ts
    │         └── schemas                           | Folder that stores The schemas (if no openApi spec present)
    │             ├── get-booking-by-id.json
    │             ├── get-booking.json
    │             ├── post-auth.json
    │             ├── post-booking.json
    │             └── put-booking-by-id.json

```

## How it works:

1. To run the test use `npm run e2e-api`

2. When the script is run the setup project is run first `global.api.setup.ts`
   It will perform an API call for authentication and retrieve a token that will be stored in BOOKING_TOKEN .env variable.
   After token is obtained it will be used as defaultHeader in Booking controller (check the constructor function)
   This allows us to run all Booking related API calls from a 'Authenticated' State.
3. Main functionality is stored in the controller classes. Example: `booking-controller.ts` Functions represent the apis like `getBook`.
   Functions in the controller are responsible for:
   - Performing the actual api call.
   - Checking the status code.
   - Validate Schemas (contract API testing)
   - Cast the response into correct type
4. If the schema is not present `validateSchema()` function from `base-controller` will autogenerate if for you. (test will fail with a warning)
5. If you wish to disable the schema validation set .env variable to true
   `SKIP_SCHEMA_VALIDATION='false'`
6. By default, expected status is set to 200, but it can be changed in an argument.
   Note: use switch statement if the response type would be different.
