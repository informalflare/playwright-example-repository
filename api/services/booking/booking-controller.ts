import bookingEndpoints from './booking-endpoints';
import { APIRequestContext } from '@playwright/test';
import { BookIdType, BookType } from './booking-types';
import { expect } from '@fixtures';
export class BookingController {
  private readonly endpoints = bookingEndpoints;
  constructor(readonly request: APIRequestContext) {}
  async getAllBookIds(expectedStatus = 200) {
    const resp = await this.request.get(this.endpoints.allBooksIds());
    expect(resp.status()).toEqual(expectedStatus);
    return (await resp.json()) as Array<BookIdType>;
  }
  async getBook(id: number, expectedStatus = 200) {
    const resp = await this.request.get(this.endpoints.getBooking(id));
    expect(resp.status()).toEqual(expectedStatus);
    return (await resp.json()) as BookType;
  }
  async logInAs(user: string, pass: string) {
    return await this.request.post(this.endpoints.auth(), { data: { username: user, password: pass } });
  }
  async updateBook(id: number, data: any, expectedStatus = 200) {
    const resp = await this.request.put(this.endpoints.update(id), { data: data });
    expect(resp.status()).toEqual(expectedStatus);
    switch (
      expectedStatus //this is needed only to return a different Type Object if necessary
    ) {
      case 200: {
        return (await resp.json()) as BookType;
      }
      case 403: {
        return;
      }
      default: {
        throw new Error('Seems like you are testing for status codes that were not expected.');
      }
    }
  }
  async postBook(data: any, expectedStatus = 200) {
    const resp = await this.request.post(this.endpoints.postBooking(), { data: data });
    expect(resp.status()).toEqual(expectedStatus);
    return (await resp.json()) as BookType;
  }
  async randomBookId() {
    const allBooks = await this.getAllBookIds();
    const index = Math.floor(Math.random() * allBooks.length);
    return allBooks[index].bookingid;
  }
}
