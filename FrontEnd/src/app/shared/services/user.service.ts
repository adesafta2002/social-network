import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty } from "lodash";
import { Observable } from "rxjs";
import { IRelationship } from "src/app/models/relationship.interface";
import { ISearchResponse } from "src/app/models/search-response.interface";
import { EFieldEndpoint, EMainEndpoint } from "../enpoints";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getSelected(payload: any) {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.user + `/${payload.id}` + this.getSearchParams(payload));
    }

    getUsers(payload: UserParams) {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.user + this.getSearchParams(payload));
    }

    sendFriendRequest(payload: IRelationship) {
        return this.http.post(EMainEndpoint.api + EFieldEndpoint.sendFriendRequest, payload, { observe: 'response', responseType: 'text' });
    }

    getRelationships(payload: UserParams): Observable<ISearchResponse> {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.user + EFieldEndpoint.getRelationships + this.getSearchParams(payload));
    }

    cancelFriendRequest(id: number) {
        return this.http.delete(EMainEndpoint.api + EFieldEndpoint.relationship + `/${id}`, { responseType: 'text' });
    }

    acceptFriendRequest(id: number) {
        return this.http.put(EMainEndpoint.api + EFieldEndpoint.relationship + `/${id}`, {}, { responseType: 'text' });
    }

    getFriends(payload: UserParams) {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.friend + this.getSearchParams(payload))
    }

    private getSearchParams(params: any) {
        const query = [];
        if (params._summary) {
            query.push('_summary=' + params._summary)
        }
        if (params.name) {
            query.push('name=' + params.name)
        }
        if (params.userId) {
            query.push('userId=' + params.userId)
        }
        return isEmpty(query) ? '' : '?' + query.join('&')
    }
}

export class UserParams {
    _summary?: boolean;
    userId?: number
    name?: string;
}