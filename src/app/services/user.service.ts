import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class UserService {
    readonly rootURL = "http://localhost:59056/api/user"

    private isLoggedIn = new BehaviorSubject<boolean>(this.subsrcriptionDefaultValue());

    private isAdmin = new BehaviorSubject<boolean>(this.subsrcriptionDefaultValueAdmin());
    subsrcriptionDefaultValue(): boolean {
        if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    subsrcriptionDefaultValueAdmin(): boolean {

        if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
            return false;
        }
        else {
            let data = localStorage.getItem('token');
            let decodedData = jwt_decode(data);
            if (decodedData.role == "True") {
                return true;
            }
            return false;
        }
    }

    constructor(private http: HttpClient) { }

    public setIsLoggedInObserver(flag: boolean) {
        this.isLoggedIn.next(flag);
    }

    public getIsLoggedInObserver(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }

    public setIsAdminObserver(flag: boolean) {
        this.isAdmin.next(flag);
    }

    public getIsAdminObserver(): Observable<boolean> {
        return this.isAdmin.asObservable();
    }


    register(emailID: string, password: string) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post<any>(this.rootURL + '/register', { emailID, password }, { headers: reqHeader })
    }
    login(emailID: string, password: string) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post<any>(this.rootURL + '/login', { emailID, password }, { headers: reqHeader })
    }
}
