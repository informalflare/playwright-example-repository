import * as process from 'process';

export const API_SETTINGS = {
  bookingBaseUrl: 'https://restful-booker.herokuapp.com',
  skipSchemaValidation: process.env.SKIP_SCHEMA_VALIDATION,
};
