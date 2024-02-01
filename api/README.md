## Preconditions

- use the .env_example file to create an env file with credentials
- credentials should be correct

# How to run the api tests

`npm run e2e-api`

# Authentication and TOKENS

- Tokens are gathered in `api/specs/global.api.setup.ts` and saved into the Environmental variables (.env file)
- To switch between users (or logged In/Out state)
- Please use `test.use({ extraHTTPHeaders: { Cookie: process.env.USER_A_TOKEN } });` in your test file or project.

# Validation

- Status code validation is preformed on controller level
- `await api.booking.getAllBookIds();` will actually check if 200 code was returned.
//TODO
add ajv schema validation
