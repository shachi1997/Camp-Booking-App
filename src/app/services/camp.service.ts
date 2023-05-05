import { Injectable } from "@angular/core";
import { ICamp } from "../models/models";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CampService {
    readonly rootURL = "http://localhost:59056/api/Camps"

    constructor(private http: HttpClient) { }

    getAllCamps() {
        return this.http.get<any>(this.rootURL + '/AllCamps')

    }
    createCamp(camp: ICamp) {
        const newCamp: ICamp = {
            CampID: null,
            CampImage: camp.CampImage,
            CampName: camp.CampName,
            Description: camp.Description,
            Capacity: camp.Capacity,
            PriceForWeekDays: camp.PriceForWeekDays,
            PriceForWeekEnds: camp.PriceForWeekEnds,
            Rating: null
        }

        return this.http.post<any>(this.rootURL + '/AddCamp', newCamp)
    }
    deleteCamp(campID: string) {
        return this.http.post<any>(this.rootURL + `/Delete/${campID}`, { campID })

    }
    readonly searchRootUrl="http://localhost:59056/api/Camp"
    searchCamp(checkIn: Date, checkOut: Date, capacity: any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.get<any>(this.searchRootUrl + `?checkIn=${checkIn}&checkOut=${checkOut}&capacity=${capacity}`, { headers: reqHeader })

    }
    campByID(campID: string) {
        return this.http.get(this.rootURL + `/Camp/${campID}`)
    }
    updateCamp(camp: ICamp) {
        return this.http.post<any>(this.rootURL + '/Update', camp)
    }
    postRating(bookingRefNo: string, rating: number) {
        return this.http.post<any>(this.rootURL + `/${bookingRefNo}/${rating}`, { bookingRefNo, rating });
    }
}