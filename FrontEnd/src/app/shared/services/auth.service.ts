import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EFieldEndpoint, EMainEnpoint } from "../enpoints";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    registerUser(payload: any) {
        return this.http.post(EMainEnpoint.authentication + EFieldEndpoint.register, payload, { headers: { skip: 'true' } });
    }

    loginUser(payload: any) {
        return this.http.post(EMainEnpoint.authentication + EFieldEndpoint.login, payload, { headers: { skip: 'true' } });
    }

    restoreUserSesssion(payload: any) {
        return this.http.post(EMainEnpoint.security + EFieldEndpoint.getCurrentUser, payload, { headers: { getFromLocalStorage: 'true' } });
    }
}