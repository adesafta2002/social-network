import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import { ILike, IPost } from 'src/app/models/post.interace';
import { IUserNotification } from 'src/app/models/user-notification.interface';
import { EFieldEndpoint, EMainEndpoint } from '../enpoints';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    get(payload) {
        return this.http.get(EMainEndpoint.api + EFieldEndpoint.post + this.getSearchParams(payload));
    }

    post(post: IPost) {
        return this.http.post(EMainEndpoint.api + EFieldEndpoint.post, post, { responseType: 'text' });
    }

    delete(id: number) {
        return this.http.delete(EMainEndpoint.api + EFieldEndpoint.post + `/${id}`);
    }

    like(like: ILike) {
        return this.http.post(EMainEndpoint.api + EFieldEndpoint.like, like, { responseType: 'text' });
    }

    unlike(payload) {
        return this.http.delete(EMainEndpoint.api + EFieldEndpoint.like + this.getSearchParams(payload));
    }

    private getSearchParams(params: any) {
        const query = [];
        if (params.observerId) {
            query.push('observerId=' + params.observerId)
        }
        if (params.userId) {
            query.push('userId=' + params.userId)
        }
        if (params.postId) {
            query.push('postId=' + params.postId)
        }
        return isEmpty(query) ? '' : '?' + query.join('&')
    }
}