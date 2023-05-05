import { Injectable } from "@angular/core";
import { IBooking } from "../models/models";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class BookingService {

    readonly rootURL = "http://localhost:59056/api/bookings"

    constructor(private http: HttpClient) { }

    bookCamp(booking: IBooking) {
        return this.http.post<any>(this.rootURL + '/BookCamp', booking)
    }

    confirmBooking(bookingRefNo: string) {
        console.log("in service.." + bookingRefNo)
        return this.http.get<any>(this.rootURL + `/Confirm/${bookingRefNo}`)
    }
    deleteBooking(bookingRefNo: string) {
        return this.http.get<any>(this.rootURL + `/delete/${bookingRefNo}`)
    }
}