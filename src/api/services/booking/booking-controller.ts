import { BookIdType, BookType } from './booking-types';
import { expect } from '@fixtures';
import { BaseController } from '../base-controller';
import { APIRequestContext } from '@playwright/test';
import { API_SETTINGS } from '../../api-settings';

export class BookingController extends BaseController {
  constructor(request: APIRequestContext) {
    super(request, {
      baseUrl: API_SETTINGS.bookingBaseUrl,
      schemaPath: 'src/api/services/booking/schemas/',
      defaultHeaders: { Cookie: `token=${process.env.BOOKING_TOKEN}` },
    });
  }
  async getAllBookIds(expectedStatus = 200) {
    const resp = await this.request.get(this.baseUrl + '/booking');
    expect(resp.status()).toEqual(expectedStatus);
    await this.validateSchema('get-booking', await resp.json());
    return (await resp.json()) as Array<BookIdType>;
  }
  async getBook(id: number, expectedStatus = 200) {
    const resp = await this.request.get(this.baseUrl + `/booking/${id}`);
    expect(resp.status()).toEqual(expectedStatus);
    await this.validateSchema(`get-booking-by-id`, await resp.json());
    return (await resp.json()) as BookType;
  }
  async logInAs(user: string, pass: string) {
    const resp = await this.request.post(this.baseUrl + `/auth`, {
      data: { username: user, password: pass },
    });
    await this.validateSchema(`post-auth`, await resp.json());
    return await resp.json();
  }
  async updateBook(id: number, data: any, expectedStatus = 200, headers: Record<string, string> = {}) {
    const resp = await this.request.put(this.baseUrl + `/booking/${id}`, {
      data: data,
      headers: this.mergeHeaders(headers),
    });
    expect(resp.status()).toEqual(expectedStatus);
    switch (
      expectedStatus //this is needed only to return a different Type Object if necessary
    ) {
      case 200: {
        await this.validateSchema(`put-booking-by-id`, await resp.json());
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
    const resp = await this.request.post(this.baseUrl + `/booking`, {
      data: data,
    });
    expect(resp.status()).toEqual(expectedStatus);
    await this.validateSchema(`post-booking`, await resp.json());
    return (await resp.json()) as BookType;
  }
  async randomBookId() {
    const allBooks = await this.getAllBookIds();
    const index = Math.floor(Math.random() * allBooks.length - 1);
    return allBooks[index].bookingid;
  }
}
