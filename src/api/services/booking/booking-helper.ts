import { faker } from '@faker-js/faker';
import { BookType } from './booking-types';
export class BookingHelper {
  generateRandomBook(): BookType {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 1, max: 9999 }),
      depositpaid: Math.random() < 0.5,
      bookingdates: {
        checkin: faker.date.past().toISOString().split('T')[0],
        checkout: faker.date.future().toISOString().split('T')[0],
      },
      additionalneeds: faker.lorem.words({ min: 1, max: 5 }),
    };
  }
}
