import { expect, test } from '@fixtures';
import { BookingHelper } from '../services/booking';

test.describe('Logged In as ADMIN tests', () => {
  test('GET all Books', async ({ api }) => {
    const allBooks = await api.booking.getAllBookIds();
    expect(allBooks.length > 0).toEqual(true);
  });
  test('Create a book with POST', async ({ api }) => {
    const book = new BookingHelper().generateRandomBook();
    //console.log(book);
    const createdBook = await api.booking.postBook(book);
    //console.log(createdBook);
    const retrievedBook = await api.booking.getBook(createdBook.bookingid);
    //console.log(retrievedBook);
    expect(retrievedBook).toEqual(book);
  });
  test('Update a book with PUT', async ({ api }) => {
    const book = new BookingHelper().generateRandomBook();
    const randomID = await api.booking.randomBookId();
    const updatedBook = await api.booking.updateBook(randomID, book);
    expect(updatedBook).toEqual(book);
  });
});

test.describe('No User rights tests', () => {
  test.use({ extraHTTPHeaders: { Cookie: `token=RomanWasHere` } });
  test('Update a book with PUT', async ({ api }) => {
    const book = new BookingHelper().generateRandomBook();
    const randomID = await api.booking.randomBookId();
    const someBook = await api.booking.getBook(randomID);
    await api.booking.updateBook(randomID, book, 403);
    expect(someBook).not.toEqual(book);
  });
});
