import { test as base } from '@playwright/test';
import { BookingController } from '../src/api/services/booking';

export interface APIFixtures {
  apiBooking: BookingController;
}
export const apiFixtures = base.extend<APIFixtures>({
  apiBooking: async ({ request }, use) => {
    await use(new BookingController(request));
  },
});
