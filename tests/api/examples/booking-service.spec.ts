import { expect, test } from '@fixtures';
import { BookingHelper } from '../../../src/api/services/booking';

test.describe('Logged In as ADMIN tests', () => {
  test('GET all Books', async ({ apiBooking }) => {
    const allBooks = await apiBooking.getAllBookIds();
    expect(allBooks.length > 0).toEqual(true);
  });
  test('Create a book with POST', async ({ apiBooking }) => {
    const book = new BookingHelper().generateRandomBook();
    const createdBook = await apiBooking.postBook(book);
    const retrievedBook = await apiBooking.getBook(createdBook.bookingid);
    expect(retrievedBook).toEqual(book);
  });
  test('Update a book with PUT', async ({ apiBooking }) => {
    const book = new BookingHelper().generateRandomBook();
    const randomID = await apiBooking.randomBookId();
    const updatedBook = await apiBooking.updateBook(randomID, book);
    expect(updatedBook).toEqual(book);
  });
});

test.describe('No User rights tests', () => {
  test('Update a book with PUT', async ({ apiBooking }) => {
    const book = new BookingHelper().generateRandomBook();
    const randomID = await apiBooking.randomBookId();
    const someBook = await apiBooking.getBook(randomID);
    await apiBooking.updateBook(randomID, book, 403, { Cookie: 'none' });
    expect(someBook).not.toEqual(book);
  });
});
