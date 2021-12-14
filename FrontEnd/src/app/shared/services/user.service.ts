import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty } from "lodash";
import { EFieldEndpoint, EMainEnpoint } from "../enpoints";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getSelected(payload: any) {
        return this.http.get(EMainEnpoint.api + EFieldEndpoint.user + `/${payload.id}` + this.getSearchParams(payload));
    }

    private getSearchParams(params: UserParams) {
        const query = [];
        if (params._summary) {
            query.push('_summary=' + params._summary)
        }
        if (params.name) {
            query.push('name=' + params.name)
        }
        return isEmpty(query) ? '' : '?' + query.join('&')
    }
}

export class UserParams {
    _summary?: boolean;
    name?: string;

}