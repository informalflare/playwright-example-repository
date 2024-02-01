class BookingEndpoints {
  allBooksIds(): string {
    return `/booking`;
  }

  getBooking(id: number): string {
    return `/booking/${id}`;
  }
  auth() {
    return `/auth`;
  }
  update(id: number): string {
    return `/booking/${id}`;
  }
  postBooking(): string {
    return `/booking`;
  }
}

export default new BookingEndpoints();
