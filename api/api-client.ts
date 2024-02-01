import { BookingController } from './services/booking';
import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  readonly booking: BookingController;
  constructor(readonly request: APIRequestContext) {
    this.booking = new BookingController(request);
  }
}
