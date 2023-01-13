import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EFieldEndpoint, EMainEndpoint } from "../enpoints";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    registerUser(payload: any) {
        return this.http.post(EMainEndpoint.authentication + EFieldEndpoint.register, payload, { headers: { skip: 'true' } });
    }

    loginUser(payload: any) {
        return this.http.post(EMainEndpoint.authentication + EFieldEndpoint.login, payload, { headers: { skip: 'true' } });
    }

    restoreUserSesssion(payload: any) {
        return this.http.post(EMainEndpoint.security + EFieldEndpoint.getCurrentUser, payload, { headers: { getFromLocalStorage: 'true' } });
    }
}