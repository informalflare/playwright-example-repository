export interface BookType {
  bookingid?: 1772;
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}
export interface BookIdType {
  bookingid: number;
}
