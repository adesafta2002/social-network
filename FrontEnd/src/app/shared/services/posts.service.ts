import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/models/post.interace';
import { IUserNotification } from 'src/app/models/user-notification.interface';
import { EFieldEndpoint, EMainEndpoint } from '../enpoints';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    get(userId) {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.post + `?userId=${userId}`);
    }

    post(post: IPost) {
        return this.http.post(EMainEndpoint.api + EFieldEndpoint.post, post, { responseType: 'text' })
    }

    delete(id: number) {
        return this.http.delete(EMainEndpoint.api + EFieldEndpoint.post + `/${id}`)
    }
}